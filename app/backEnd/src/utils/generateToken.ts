import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from 'src/interfaces/IUser';

const { JWT_SECRET } = process.env;

export default function generateToken(data: IUser): string {
    const { id, username, email } = data;
    const token = jwt.sign({ id, username, email }, JWT_SECRET as jwt.Secret, {
        algorithm: 'HS256',
        expiresIn: '1d',
    });
    return token;
};
