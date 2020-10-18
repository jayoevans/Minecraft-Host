import express from "express";
import axios from "axios";

export const login = express.Router();
let users = {
  user1: [
    {
      username: "ben",
      password: "123",
    },
  ],
  user2: [
    {
      username: "jay",
      password: "123",
    },
  ],
};

login.post("/", (req: express.Request, res: express.Response) => 
{
    res.send(200);
})