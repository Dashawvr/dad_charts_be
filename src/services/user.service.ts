import { Pool } from 'pg';
import { config } from "../configs";

const pool = new Pool({
    user:  'dashaonishchenko',
    host: 'localhost',
    database: 'postgres',
    password: 'HomeHome20012018',
    port: 5432,
});

class UserService {
    async getNewUsersCount() {
        const query = `SELECT COUNT(*) FROM users WHERE date_created >= NOW() - INTERVAL \'7 days\'`;
        const result = await pool.query(query);
        return result.rows[0].count;
    }

    async getDAUCount() {
        const query = `SELECT COUNT(DISTINCT user_id) FROM sessions WHERE date_created = CURRENT_DATE`;
        const { rows } = await pool.query(query);
        return rows[0].count;
    }

    async getSessionData() {
        const query = `SELECT COUNT(*) AS session_count, date_trunc(\'day\', date_created) AS day FROM sessions GROUP BY day`;
        const { rows } = await pool.query(query);
        const data = rows.map(row => ({
            x: row.day,
            y: row.session_count,
        }));
        return data;
    }

    async getCountryBreakdown() {
        const query = `SELECT country, COUNT(*) AS user_count FROM users GROUP BY country ORDER BY user_count DESC LIMIT 5`;
        const { rows } = await pool.query(query);
        const labels = rows.map(row => row.country);
        const data = rows.map(row => row.user_count);
        return { labels, data };
    }

    async getTopEvents() {
        const query = `SELECT event_name, COUNT(*) AS event_count FROM events GROUP BY event_name ORDER BY event_count DESC LIMIT 5`;
        const { rows } = await pool.query(query);
        const labels = rows.map(row => row.event_name);
        const data = rows.map(row => row.event_count);
        return { labels, data };
    }

    async getRetention(startDate: string, endDate: string) {
        const query = `
    WITH cohort AS (
      SELECT
        user_id,
        date_trunc('day', MIN(date_created)) AS cohort_day
      FROM
        sessions
      GROUP BY
        user_id
    ),
    retention AS (
      SELECT
        c.cohort_day,
        date_trunc('day', s.date_created) AS day,
        COUNT(DISTINCT s.user_id) AS user_count
      FROM
        sessions s
        INNER JOIN cohort c ON s.user_id = c.user_id
      WHERE
        s.date_created >= c.cohort_day
        AND s.date_created < c.cohort_day + INTERVAL '7 days'
      GROUP BY
        1, 2
    )
    SELECT
      cohort_day,
      day,
      ROUND(100.0 * user_count / NULLIF((SELECT COUNT(*) FROM users WHERE date_trunc('day', date_created) = cohort_day), 0), 1) AS retention
    FROM
      retention
    WHERE
      cohort_day >= $1
      AND cohort_day <= $2
    ORDER BY
      1, 2;
  `;
        const values = [startDate, endDate];

        try {
            const { rows } = await pool.query(query, values);

            // Format the data as an array of objects with cohortDay, day, and retention properties
            const data = rows.map(row => ({
                cohortDay: row.cohort_day,
                day: row.day,
                retention: row.retention,
            }));

            return data;
        } catch (error) {
            throw new Error(`Unable to fetch retention data: ${error}`);
        }
    }

}

export const userService = new UserService()
