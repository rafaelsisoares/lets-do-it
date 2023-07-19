import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'safe-password',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    database: process.env.MYSQL_DATABASE || 'database',
    port: Number(process.env.MYSQL_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'Z',
    },
    logging: false,
}

module.exports = config;
