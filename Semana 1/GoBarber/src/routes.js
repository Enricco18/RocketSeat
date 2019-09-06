import { Router } from 'express';
import multer from 'multer';

import ScheduleController from './app/controller/ScheduleController';
import AppointmentController from './app/controller/AppointmentController';
import ProviderController from './app/controller/ProviderController';
import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import FileController from './app/controller/FileController';
import NotificationController from './app/controller/NotificationController';

import authMiddleware from './app/middleware/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/providers', ProviderController.index);

routes.use(authMiddleware);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/schedules', ScheduleController.index);
routes.get('/notification', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);
export default routes;
