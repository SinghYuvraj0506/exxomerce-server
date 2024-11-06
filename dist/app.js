"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const ApiError_1 = require("./utils/ApiError");
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/healthcheck", (req, res) => {
    res.send("Hello guys welcome to server");
});
app.use("/api/v1", (0, routes_1.default)());
// 404 route handler
app.all("*", (req, res) => {
    throw new ApiError_1.ApiError(404, `Route ${req.originalUrl} Not Found!!!`);
});
app.use(error_middleware_1.ErrorMiddleware);
exports.default = app;
