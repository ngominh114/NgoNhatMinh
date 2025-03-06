import express from "express";
import cors from "cors";
import { config } from "./configurations/config";
import bookRouter from "./routes/book.route";
import { AppDataSource } from "./database/database";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRouter);

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!");
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    })
    .catch((err) => console.log(err));