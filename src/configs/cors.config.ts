import { ResponseStatusCodes } from '../constants/enums/cors.enum';
import { ErrorHandler, errors } from '../errors';
import { config } from './global.config';

export const corsOptions = {
    origin: (origin: string | undefined, callback: CallableFunction): void => {
        const whiteList = config.FRONTEND_URL.split(';');

        if (!origin) {
            return callback(new ErrorHandler(
                ResponseStatusCodes.FORBIDDEN,
                errors.CORS_NOT_ALLOWED.message,
                errors.CORS_NOT_ALLOWED.code
            ), false);
        }

        if (!whiteList.includes(origin)) {
            return callback(new ErrorHandler(
                ResponseStatusCodes.FORBIDDEN,
                errors.CORS_NOT_ALLOWED.message,
                errors.CORS_NOT_ALLOWED.code
            ), false);
        }
        callback(null, true);
    }
};
