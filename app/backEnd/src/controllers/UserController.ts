import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
    private _service = new UserService();

    async createUser(req: Request, res: Response): Promise<Response> {
        const { cod, message } = await this._service.createUser(req.body);
        return res.status(cod).json({ message })
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { cod, message } = await this._service.login(req.body);
        return res.status(cod).json({ message });
    }

    async getUserByToken(req: Request, res: Response): Promise<Response> {
        const { authorization } = req.headers;
        const { cod, message } = await this._service.getUserByToken(authorization);
        return res.status(cod).json({ message: JSON.parse(message) })
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { cod, message } = await this._service.updateUser(req.body, +id);
        return res.status(cod).json({ message })
    }

    async removeUser(req: Request, res: Response): Promise<Response> {
        const { authorization } = req.headers;
        const { id } = req.params;
        if (!authorization) {
            return res.status(401).json({ message: 'Token not found' });
        }
        const { cod, message } = await this._service.removeUser(authorization, +id);
        return res.status(cod).json({ message });
    }
}