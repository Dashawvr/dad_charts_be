import { NextFunction, Request, Response } from 'express';
import { userService } from "../services/user.service";


class UserController {
    async newUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const count = await userService.getNewUsersCount();
            res.send(count);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }


    async getDAU(req: Request, res: Response):Promise<void> {
        try {
            const count = await userService.getDAUCount();
            res.send(count);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getSessionData(req: Request, res: Response):Promise<void> {
        try {
            const data = await userService.getSessionData();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

   async getCountryBreakdown(req: Request, res: Response):Promise<void> {
        try {
            const data = await userService.getCountryBreakdown();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    };

    async getTopEvents(req: Request, res: Response):Promise<void> {
        try {
            const data = await userService.getTopEvents();
            res.send(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    };

    async getRetention(req: Request, res: Response):Promise<void> {
        try {
            const startDate = req.query.startDate as string;
            const endDate = req.query.endDate as string;
            const data = await userService.getRetention(startDate, endDate);
            res.send(data);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    };
}

export const userController = new UserController();
