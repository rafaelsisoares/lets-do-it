import { Router } from "express";
import checkLoginData from "../middlewares/checkLoginData";
import UserController from "../controllers/UserController";
import checkNewUserData from "../middlewares/checkNewUserData";
import checkToken from "../middlewares/checkToken";

const controller = new UserController();
const router = Router();

router.post('/', checkNewUserData, (req, res) => controller.createUser(req, res));
router.get('/login', checkLoginData, (req, res) => controller.login(req, res));
router.get('/', checkToken,  (req, res) => controller.getUserByToken(req, res));
router.put('/:id', checkToken, checkNewUserData, (req, res) => controller.updateUser(req, res));
router.delete('/:id', checkToken, (req, res) => controller.removeUser(req, res));

export default router;