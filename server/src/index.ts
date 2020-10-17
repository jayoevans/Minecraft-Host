import {App} from "./app";

const app: App = new App();
const port: number = parseInt(`${process.env.PORT}`) || 5000;

app.setup();
app.listen(port);
