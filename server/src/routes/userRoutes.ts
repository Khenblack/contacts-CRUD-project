import { Router } from 'express';
import * as UserController from '../controllers/UserController';

const contactsRouter: Router = Router();

contactsRouter.post('/add', UserController.add);
contactsRouter.delete('/:id', UserController.remove);
contactsRouter.patch('/:id', UserController.update);
contactsRouter.get('/:id', UserController.get);
contactsRouter.get('/', UserController.getAll);

export default contactsRouter;
