import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { router } from "./api/server";
import { minecraft } from "./api/minecraft";
import { login } from "./api/login";
import {test} from "./api/test";
import { Middlewares } from "./middlewares";

const app = express();


//Having these in a private function doesnt work
app.use("/test", test);
app.use("/minecraft", minecraft);
app.use("/login", login);
app.use("/server", router);

export class App
{
    public setup()
    {
        console.log("In setup");

        this.middleware();
        this.routes();
        this.assets();
    }

    private middleware()
    {
        console.log("In middleware");

        app.use(express.json());

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(morgan('dev'));
        app.use(helmet());
        app.use(cors());

        app.use(Middlewares.notFound);
        app.use(Middlewares.errorHandler);
    }

    private routes()
    {
        console.log("In routes");
        app.use('/router', router);
        app.use("/test", test);
    }

    private assets()
    {
        console.log("In assets");

        app.use(express.static("public"));
        app.use(express.static("views"));
    }

    public listen(port: number)
    {
        app.listen(port, () => console.log(`Running server on port ${port}...`));
    }
}