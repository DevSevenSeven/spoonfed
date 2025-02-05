import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserGenerator } from './user.js';
const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
const User = UserGenerator(sequelize);
export { sequelize, User };
