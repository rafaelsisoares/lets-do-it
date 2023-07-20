import { Router } from "express";
import UserController from "src/controllers/UserController";

const controller = new UserController();
const router = Router();

router.post('/', (req, res) => controller.createUser(req, res));

export default router;