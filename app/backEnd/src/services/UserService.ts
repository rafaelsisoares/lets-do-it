import { ModelStatic } from "sequelize";
import * as bcrypt from 'bcrypt';
import UserModel from "../database/models/UserModel";
import { ILogin, IUser, IResponse } from '../interfaces';
import generateToken from "../utils/generateToken";
import decodeToken from "../utils/decodeToken";
import validateLoginData from "./validators/validateLoginData";
import validateNewUserData from "./validators/validateNewUserData";
import { newUserSchema } from "./validators/schemas";

const saltRounds = 10;

export default class UserService {
    private _model: ModelStatic<UserModel> = UserModel;

    async createUser(user: IUser): Promise<IResponse> {
        const { username, email, password } = user;
        const { type, message } = validateNewUserData({ username, email, password });
        if (type) return { cod: 400, message };
        const codePassword = await bcrypt.hash(password, saltRounds);
        const { dataValues } = await this._model.create({
            username,
            email,
            password: codePassword,
        });
        const token = generateToken(dataValues);
        return { cod: 201, message: token };
    }

    async login(data: ILogin): Promise<IResponse> {
        const { email, password } = data;
        const { type, message } = validateLoginData({ email, password });
        if (type) return { cod: 400, message }
        const user = await this._model.findOne({
            where: { email },
        });
        if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
            return { cod: 404, message: 'User Not Found' }
        }
        const token = generateToken(user.dataValues);
        return { cod: 200, message: token };
    }

    async getUserByToken(token: string | undefined): Promise<IResponse> {
        if (!token) {
            return { cod: 400, message: 'Token not found' };
        }
        try {
            const user = decodeToken(token);
            return {
                cod: 200,
                message: JSON.stringify(user),
            };
        } catch (e) {
            console.error(e);
            return { cod: 401, message: 'Access denied' };
        }
    }

    async updateUser(newData: IUser, id: number): Promise<IResponse> {
        const { type, message } = validateNewUserData(newData);
        if (type) return { cod: 400, message };
        const { username, email, password } = newData;
        const codePassword = await bcrypt.hash(password, saltRounds);
        const affectedCount = await this._model.update({
            username,
            email,
            password: codePassword,
        }, { where: { id } });
        if (affectedCount[0] === 0) {
            return { cod: 404, message: 'User not found' };
        }
        return { cod: 200, message: 'User updated' };
        
    }
}