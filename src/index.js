import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.use(express.static("public"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(router);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
