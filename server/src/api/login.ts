import express from "express";
import axios from "axios";

export const login = express.Router();

login.post("/login", (req: express.Request, res: express.Response) => {
    try 
    {
        console.log(req.body);
        res.sendStatus(200);
    }
    catch (error) 
    {
        console.log(error);
    }
})