import { DataSource } from "typeorm";
import { Book } from "../models/book";
import { config } from "../configurations/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.database.host,
    port: Number(config.database.port),
    database: config.database.name,
    username: config.database.username,
    password: config.database.password,
    entities: [Book],
    synchronize: true,
  });