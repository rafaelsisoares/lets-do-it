import { Router } from 'express';
import TaskController from "../controllers/TaskController";

const controller = new TaskController();
const router = Router();

router.post('/', (req, res) => controller.createTask(req, res));
router.get('/user/:id', (req, res) => controller.getTasksByUser(req, res));

export default router;