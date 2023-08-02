import { ModelStatic } from "sequelize";
import TaskModel from "../database/models/TaskModel";
import { IResponse, ITask } from "../interfaces";

export default class TaskService {
    private _model: ModelStatic<TaskModel> = TaskModel;

    async createTask(task: ITask): Promise<IResponse> {
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
}