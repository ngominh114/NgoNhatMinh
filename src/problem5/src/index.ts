import express from "express";
import cors from "cors";
import { config } from "./configurations/config";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});