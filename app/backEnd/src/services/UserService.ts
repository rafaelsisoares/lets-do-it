import { ModelStatic } from "sequelize";
import UserModel from "../database/models/UserModel";
import IUser from "../interfaces/IUser";

export default class UserService {
    private _model: ModelStatic<UserModel> = UserModel;

    async createUser(user: IUser) {
        const { username, email, password } = user
        await this._model.create({username, email, password})
        return {cod: 201, message: 'Usuário cadastrado'}
    }
}