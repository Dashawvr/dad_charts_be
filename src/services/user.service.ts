import {Pool} from 'pg';
import {config} from "../configs";

const pool = new Pool({
    user:  config.DATABASE_USER,
    host: config.DATABASE_HOST,
    database: config.DATABASE_NAME,
    password: config.DATABASE_PASSWORD,
    port: 5432,
});

class UserService {
    async getNewUsers() {
        const query = `
            SELECT COUNT(DISTINCT user_id) AS new_users
            FROM events
            WHERE timestamp >= current_date - INTERVAL '7' DAY
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getDAU() {
        const query = `
            SELECT timestamp, COUNT(DISTINCT user_id) AS dau
            FROM events
            WHERE timestamp >= current_date - INTERVAL '7' DAY
            GROUP BY 1
            ORDER BY 1 ASC
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getSessionData() {
        const query = `
            SELECT timestamp::date, COUNT(DISTINCT session) AS sessions
            FROM events
            WHERE timestamp >= current_date - INTERVAL '7' DAY AND log_type = 'install' OR log_type = 'session_start'
            GROUP BY 1
            ORDER BY 1 ASC
        `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getCountryBreakdown() {
        const query = `
      SELECT country, COUNT(DISTINCT user_id) AS users
      FROM events
      WHERE timestamp >= current_date - INTERVAL '7' DAY
      GROUP BY 1
      ORDER BY 2 DESC
      LIMIT 5
    `;
        const { rows } = await pool.query(query);
        return rows;
    }

    async getTopEvents() {
        const query = `SELECT event_name, COUNT(*) AS event_count FROM events GROUP BY event_name ORDER BY event_count DESC LIMIT 5`;
        const { rows } = await pool.query(query);
        const labels = rows.map(row => row.event_name);
        const data = rows.map(row => row.event_count);
        return { labels, data };
    }

    async getSessionsByDate(granularity: any) {
        try {
            const query = (
                `SELECT DATE_TRUNC('${granularity}', "timestamp") AS date, COUNT(*) AS count
                 FROM events
                 GROUP BY date
                 ORDER BY date ASC`
            );
            const { rows } = await pool.query(query)
            return rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
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
            return rows.map(row => ({
                cohortDay: row.cohort_day,
                day: row.day,
                retention: row.retention,
            }));
        } catch (error) {
            throw new Error(`Unable to fetch retention data: ${error}`);
        }
    }

    async getMetrics() {
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM events`);
            client.release();
            return result.rows;
        } catch (error) {
            console.error(error);
        }
    }

    async getMetricById(metricId: number) {
        const query = `
    SELECT timestamp, app, user_id, device, country, session, log_type, event_type, meta_data 
    FROM events 
    WHERE id = $1
  `;
        const { rows } = await pool.query(query, [metricId]);
        return rows;
    }

}

export const userService = new UserService()
