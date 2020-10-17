import express from "express";

export namespace Middlewares
{
    export function notFound(req: express.Request, res: express.Response, next: express.NextFunction)
    {
        res.status(404);
        const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
        next(error);
    }

    export function errorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction)
    {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

        res.status(statusCode);

        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
        });
    }
}
