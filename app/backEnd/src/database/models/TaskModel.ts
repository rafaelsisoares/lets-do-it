import { Model, INTEGER, STRING, BOOLEAN } from "sequelize";
import { ITask } from "../../interfaces";
import UserModel from "./UserModel";
import db from '.';

export default class TaskModel extends Model implements ITask {
    declare id: number;
    declare task: string;
    declare completed: boolean;
    declare userId: number;
};

TaskModel.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    task: {
        type: STRING,
        allowNull: false,
    },
    completed: BOOLEAN,
    userId: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    timestamps: false,
    underscored: true,
    modelName: 'tasks',
    sequelize: db,
});

TaskModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
UserModel.hasMany(TaskModel, { foreignKey: 'id', as: 'task' });
