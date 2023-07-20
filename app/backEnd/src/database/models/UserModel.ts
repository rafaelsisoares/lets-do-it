import { Model, INTEGER, STRING } from "sequelize";
import IUser from "src/interfaces/IUser";
import db from '.';

export default class UserModel extends Model implements IUser {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
}

UserModel.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: STRING,
    email: STRING,
    password: STRING,
}, {
    timestamps: false,
    underscored: true,
    modelName: 'users',
    sequelize: db,
});
