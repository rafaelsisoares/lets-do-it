import { Router } from 'express';
import TaskController from "../controllers/TaskController";
import checkToken from '../middlewares/checkToken';
import checkNewTaskData from '../middlewares/checkNewTaskData';

const controller = new TaskController();
const router = Router();

router.post('/', checkToken, checkNewTaskData, (req, res) => controller.createTask(req, res));
router.get('/user/:id', checkToken, (req, res) => controller.getTasksByUser(req, res));
router.put('/completed/:id', (req, res) => controller.updateCompleted(req, res));

export default router;