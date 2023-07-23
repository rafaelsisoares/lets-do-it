import { Router } from "express";
import checkLoginData from "../middlewares/checkLoginData";
import UserController from "../controllers/UserController";
import checkNewUserData from "../middlewares/checkNewUserData";

const controller = new UserController();
const router = Router();

router.post('/', checkNewUserData, (req, res) => controller.createUser(req, res));
router.get('/login', checkLoginData, (req, res) => controller.login(req, res));

export default router;