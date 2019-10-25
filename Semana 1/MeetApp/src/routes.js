import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import MeetupController from './app/controllers/MeetupController';
import ScheduleController from './app/controllers/ScheduleController';
import SubscriptionController from './app/controllers/SubscriptionController';

const router = new Router();
const upload = multer(multerConfig);

router.get('/', (req, res) => {
    res.status(200).send({ ok: 'td certo' });
});

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.put('/users', UserController.update);

router.post('/files', upload.single('file'), FileController.store);

router.post('/meetup', MeetupController.store);
router.put('/meetup/:id', MeetupController.update);
router.delete('/meetup/:id', MeetupController.delete);
router.get('/meetup', MeetupController.index);

router.get('/schedules', ScheduleController.index);

router.post('/subscription/:id', SubscriptionController.store);
router.get('/subscription', SubscriptionController.index);

export default router;
