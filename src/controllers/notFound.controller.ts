import {Request, Response} from 'express';

import { ResponseStatusCodes } from '../constants/enums/responseStatusCode.enum';
import { ErrorHandler, errors } from '../errors';

export class NotFoundController {
    public all(req: Request, res: Response): void {
        throw new ErrorHandler(
            ResponseStatusCodes.NOT_FOUND,
            errors.NOT_FOUND_ROUTE.message,
            errors.NOT_FOUND_ROUTE.code
        );
    }
}

export const notFoundController = new NotFoundController();
