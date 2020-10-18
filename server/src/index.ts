import { App } from "./app";

const port: number = parseInt(`${process.env.PORT}`) || 5000;

App.listen(port);
