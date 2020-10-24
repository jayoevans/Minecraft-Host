"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("./api/server");
const minecraft_1 = require("./api/minecraft");
const login_1 = require("./api/login");
const middlewares_1 = require("./middlewares");
const app = express_1.default();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
app.use(cors_1.default());
app.use("/minecraft", minecraft_1.minecraft);
app.use("/login", login_1.login);
app.use("/server", server_1.server);
app.use(express_1.default.static("public"));
app.use(express_1.default.static("views"));
app.use(middlewares_1.Middlewares.notFound);
app.use(middlewares_1.Middlewares.errorHandler);
var App;
(function (App) {
    function listen(port) {
        app.listen(port, () => console.log(`Running server on port ${port}...`));
    }
    App.listen = listen;
})(App = exports.App || (exports.App = {}));
//# sourceMappingURL=app.js.map