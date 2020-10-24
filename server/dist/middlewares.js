"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
var Middlewares;
(function (Middlewares) {
    function notFound(req, res, next) {
        res.status(404);
        const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
        next(error);
    }
    Middlewares.notFound = notFound;
    function errorHandler(err, req, res, next) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode);
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
        });
    }
    Middlewares.errorHandler = errorHandler;
})(Middlewares = exports.Middlewares || (exports.Middlewares = {}));
//# sourceMappingURL=middlewares.js.map