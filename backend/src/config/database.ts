import { Options, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isSSl = process.env.DB_SSL === 'true';

const sequelizeOptions: Options = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
  logging: false,
  dialectOptions : isSSl ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  :{}
}


export const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  sequelizeOptions
  // {
  //   host: process.env.DB_HOST,
  //   port: Number(process.env.DB_PORT || 5432),
  //   dialect: "postgres",
  //   logging: false,
  // },
);