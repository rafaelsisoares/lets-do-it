import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from 'src/interfaces';

const { JWT_SECRET } = process.env;

export default function decodeToken(token: string) {
    const payload = jwt.verify(token, JWT_SECRET as jwt.Secret)
    return payload as IUser;
}