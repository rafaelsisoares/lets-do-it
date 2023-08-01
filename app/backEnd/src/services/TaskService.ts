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
}