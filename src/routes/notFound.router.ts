import { Router } from 'express';

import { notFoundController } from '../controllers/notFound.controller';

const router = Router();

router.all('*', notFoundController.all);

export const notFoundRouter = router;
