import dotenv from "dotenv";

dotenv.config();

import { Sequelize, Options } from "sequelize";
import { UserGenerator } from "./user.js";

const sequelize_options: Options = {
  host: "localhost",
  dialect: "postgres",
  dialectOptions: {
    decimalNumbers: true,
    /*
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important for self-signed certificates
    },*/
  },
};

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, sequelize_options)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      sequelize_options
    );

const User = UserGenerator(sequelize);

export { sequelize, User };
