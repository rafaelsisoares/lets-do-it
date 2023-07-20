import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
    private _service = new UserService();

    async createUser(req: Request, res: Response): Promise<Response> {
        const {cod, message} = await this._service.createUser(req.body);
        return res.status(cod).json({message})
    }
}