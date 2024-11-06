"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
app_1.default.on("error", (err) => {
    console.log("Error occured in express server", err);
    throw err;
});
app_1.default.listen(process.env.PORT, () => {
    console.log("Server running at port", process.env.PORT);
});
