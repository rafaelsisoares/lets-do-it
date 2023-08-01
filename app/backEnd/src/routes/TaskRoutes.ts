import { Router } from 'express';
import TaskController from "../controllers/TaskController";

const controller = new TaskController();
const router = Router();

router.post('/', (req, res) => controller.createTask(req, res));

export default router;