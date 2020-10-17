import express, {Request, Response} from "express";

export const test = express.Router();

test.get("/", async(req: Request, res: Response) =>
{
    try
    {
        res.send("working");
    }
    catch(e)
    {
        res.send(e);
    }
})