import { ILogin, IValidate } from "../../interfaces";
import { loginSchema } from "./schemas";

export default function validateLoginData(data: ILogin): IValidate {
    const { error } = loginSchema.validate(data);
    if (error) return { type: 'BAD_REQUEST', message: 'Invalid values' };
    return { type: null, message: '' };
};
