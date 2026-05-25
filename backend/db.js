import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PWD,
  port: process.env.DBPORT,
});
pool.on("connect", () => {
  console.log("Connected Lol");
});
