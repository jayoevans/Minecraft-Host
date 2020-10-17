import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { Middlewares } from "./middlewares";

const app = express();

export class App
{
    public setup()
    {
        this.middleware();
        this.routes();
        this.assets();
    }

    private middleware()
    {
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
        // app.use('/api', router);
    }

    private assets()
    {
        app.use(express.static("public"));
        app.use(express.static("views"));
    }

    public listen(port: number)
    {
        app.listen(port, () => console.log(`Running server on port ${port}...`));
    }
}