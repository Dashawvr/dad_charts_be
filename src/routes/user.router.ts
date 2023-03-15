import { Router } from 'express';
import { userController } from "../controllers/user.controller";


const router = Router();

// Define the API routes for each metric
router.get('/newusers', userController.newUser);

router.get('/dau', userController.getDAU)

router.get('/sessions', userController.getSessionData);

router.get('/countrybreakdown', userController.getCountryBreakdown);

router.get('/topevents', userController.getTopEvents);

router.get('/retention', userController.getRetention)



export const userRouter = router;
