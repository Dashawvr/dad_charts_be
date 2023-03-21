import { Request, Response } from 'express';
import { userService } from "../services/user.service";


class UserController {
    async newUser(req: Request, res: Response): Promise<void> {
        try {
            const data = await userService.getNewUsers();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }


    async getDAU(req: Request, res: Response):Promise<void> {
        try {
            const data = await userService.getDAU();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

    async getSessionData(req: Request, res: Response):Promise<void> {
        try {
            const data = await userService.getSessionData();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }

   async getCountryBreakdown(req: Request, res: Response):Promise<void> {
       try {
           const data = await userService.getCountryBreakdown();
           res.status(200).json(data);
       } catch (error) {
           console.log(error);
           res.status(500).send('Internal server error');
       }
    };

    async getSessionsByDate(req: Request, res: Response) {
        const { granularity } = req.query;
        try {
            const sessions = await userService.getSessionsByDate(granularity);

            res.status(200).json({ data: sessions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

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

    async getMetrics(req: Request, res: Response):Promise<void> {
        try {
            const metrics = await userService.getMetrics();
            res.json(metrics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getMetricId(req: Request, res: Response) {
        try {
            const { metricId } = req.params;
            const data = await userService.getMetricById(+metricId);
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const userController = new UserController();
