import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.get('/', (req, res) => {
    res.status(200).send({ ok: 'td certo' });
});

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.post('/students', StudentController.store);
router.put('/students', StudentController.update);

export default router;
