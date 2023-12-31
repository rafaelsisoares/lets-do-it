import { ModelStatic } from "sequelize";
import TaskModel from "../database/models/TaskModel";
import validateNewTaskData from "./validators/validateNewTaskData";
import { IResponse, ITask } from "../interfaces";
import decodeToken from "../utils/decodeToken";

export default class TaskService {
    private _model: ModelStatic<TaskModel> = TaskModel;

    async createTask(task: ITask): Promise<IResponse> {
        const { type, message } = validateNewTaskData(task);
        if (type) return { cod: 400, message };
        try {
            const { dataValues } = await this._model.create({ ...task });
            return {
                cod: 201,
                message: `Task ${dataValues.task} created!`,
            }
        } catch (e) {
            console.error(e);
            return { cod: 400, message: 'Error' }
        }
    }

    async getTasksByUser(id: number): Promise<IResponse> {
        const result = await this._model.findAll({ where: { userId: id } });
        if (result.length === 0) {
            return { cod: 400, message: 'No tasks' };
        }
        return { cod: 200, message: result.map((task) => task.dataValues) };
    }

    async getTaskById(id: number): Promise<ITask | null> {
        const result = await this._model.findOne({ where: { id } });
        if (!result) return result;
        return result.dataValues as ITask;
    }

    async updateCompleted(id: number): Promise<IResponse> {
        const task = await this.getTaskById(id);
        if (!task) return { cod: 404, message: 'Task not found' };
        await this._model.update({
            completed: !task.completed
        }, {
            where: { id }
        });
        return { cod: 200, message: 'Task status updated!' };
    }

    async updateTask(id: number, token: string | undefined, task: ITask): Promise<IResponse> {
        const { type, message } = validateNewTaskData(task);
        if (type) return { cod: 400, message };
        if (!token) return { cod: 401, message: 'Token not found' };
        const user = decodeToken(token);
        const affectedCount = await this._model.update({ ...task }, {
            where: { id, userId: user.id },
        });
        if (affectedCount[0] === 0) return { cod: 404, message: 'Task not found' };
        return { cod: 200, message: 'Task updated' };
    }

    async removeTask(token: string | undefined, id: number): Promise<IResponse> {
        if (!token) return { cod: 401, message: 'Token not found' };
        const user = decodeToken(token);
        const affectedCount = await this._model.destroy({
            where: { id, userId: user.id },
        });
        if (!affectedCount) return { cod: 404, message: 'Task not found' };
        return { cod: 204, message: '' };
    }
}