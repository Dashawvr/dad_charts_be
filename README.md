# dad_charts_be
Backend Structure
Build a backend to support API routes for the Frontend to fetch analytical data.
The backend must do the following:
1. Utilize Databases of your choice for Analytics Data querying: PostgreSQL, MySQL, AWS
Redshift, BigQuery (No need to connect a real DB, we want to see how you build
queries)
2. Use NodeJS and ExpressJS as your backend
3. Pick 4 from these metric KPIs to create queries for, these will be added to the Metric
selector:
a. New Users
b. DAU: Daily Active Users
c. Sessions: Total number of sessions by date, use install or session_start as a
session
d. Country Breakdown: Bar chart of the top 5 user countries
e. Top Events: Bar chart of the top 5 events in a session
f. Retention: Daily user retention for up to 7 days, plotted using a line chart
4. Your backend must have created routes for each analytical query chart type such as:
“/api/data/newusers”.
5. Backend routes must deliver queried data to the frontend ready to be plotted. However,
this can be test data only and does not need to be delivered. We are ultimately looking
for how the SQL query is coded.
