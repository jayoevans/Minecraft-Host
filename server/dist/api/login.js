"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = __importDefault(require("express"));
exports.login = express_1.default.Router();
let users = [
    {
        id: 1,
        username: "ben",
        password: "123",
    },
    {
        id: 2,
        username: "jay",
        password: "123",
    },
    {
        id: 3,
        username: "user1",
        password: "123",
    },
    {
        id: 4,
        username: "user2",
        password: "123",
    }
];
exports.login.post("/", (req, res) => {
    let sentData = req.body.data;
    let loggedIn = false;
    for (let key in users) {
        if (users.hasOwnProperty(key) && loggedIn == false) {
            if (users[key].username == sentData.username) {
                console.log("Same usernames");
                if (users[key].password == sentData.password) {
                    loggedIn = true;
                }
                else {
                    loggedIn = false;
                }
            }
        }
    }
    if (loggedIn) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});
//# sourceMappingURL=login.js.map