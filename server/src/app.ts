import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { server } from "./api/server";
import { minecraft } from "./api/minecraft";
import { login } from "./api/login";
import {test} from "./api/test";
import { Middlewares } from "./middlewares";

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use("/test", test);
app.use("/minecraft", minecraft);
app.use("/login", login);
app.use("/server", server);

app.use(express.static("public"));
app.use(express.static("views"));

app.use(Middlewares.notFound);
app.use(Middlewares.errorHandler);

export namespace App
{
    export function listen(port: number)
    {
        app.listen(port, () => console.log(`Running server on port ${port}...`));
    }
}
