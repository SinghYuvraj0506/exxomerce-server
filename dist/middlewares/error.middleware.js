"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ApiError_js_1 = require("../utils/ApiError.js");
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    err.message = err.message || "Internal Server Error";
    // checking the types of error-----------
    if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ApiError_js_1.ApiError(400, message);
    }
    // Duplicate key Error ---------
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ApiError_js_1.ApiError(400, message);
    }
    return res.status(err === null || err === void 0 ? void 0 : err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
