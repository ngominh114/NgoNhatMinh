import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
};