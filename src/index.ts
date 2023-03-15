import express from 'express';
import { apiRouter, notFoundRouter } from "./routes";
import { config } from './configs'
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('*', notFoundRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
});

app.listen(config.SERVER_PORT, () => console.log(`(☞ﾟヮﾟ)☞ Server ready leat http://localhost:${config.SERVER_PORT}/ ☜(ﾟヮﾟ☜)`));
