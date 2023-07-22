import { Router } from "express";
import checkLoginData from "../middlewares/checkLoginData";
import UserController from "../controllers/UserController";

const controller = new UserController();
const router = Router();

router.post('/', (req, res) => controller.createUser(req, res));
router.get('/login', checkLoginData, (req, res) => controller.login(req, res));

export default router;