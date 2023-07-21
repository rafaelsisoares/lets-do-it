import { ModelStatic } from "sequelize";
import * as bcrypt from 'bcrypt';
import UserModel from "../database/models/UserModel";
import IUser from "../interfaces/IUser";
import IResponse from "../interfaces/IResponse";
import generateToken from "../utils/generateToken";

const saltRounds = 10;

export default class UserService {
    private _model: ModelStatic<UserModel> = UserModel;

    async createUser(user: IUser): Promise<IResponse> {
        const { username, email, password } = user;
        const codePassword = await bcrypt.hash(password, saltRounds);
        const { dataValues } = await this._model.create({
            username,
            email,
            password: codePassword,
        });
        const token = generateToken(dataValues);
        return {cod: 201, message: token};
    }
}