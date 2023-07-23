import { IUser, IValidate } from "src/interfaces";
import { newUserSchema } from "./schemas";

export default function validateNewUserData(user: IUser): IValidate {
    const { error } = newUserSchema.validate(user);
    if (error) return { type: 'BAD_REQUEST', message: 'Invalid values' };
    return { type: null, message: '' }
};