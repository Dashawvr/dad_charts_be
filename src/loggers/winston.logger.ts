import * as winston from 'winston';

import { winstonOptions } from '../configs';

export const logger = winston.createLogger({
    transports: [
        new (winston.transports.File)(winstonOptions.errorFile)
    ],
    exitOnError: false
});
