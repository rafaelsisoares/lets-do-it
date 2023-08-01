import { Request, Response } from "express";
import TaskService from "../services/TaskService";

export default class TaskController {
    private _service = new TaskService();

    async createTask(req: Request, res: Response): Promise<Response> {
        const { cod, message } = await this._service.createTask(req.body);
        return res.status(cod).json({ message });
    }
}