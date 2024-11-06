"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const payment_controller_1 = require("../controllers/payment.controller");
const payment_schema_1 = require("../schemas/payment.schema");
exports.default = (router) => {
    router
        .route("/payment/createPaymentSession")
        .post((0, validate_middleware_1.default)(payment_schema_1.CreatePaymentSessionSchema), payment_controller_1.createPaymentSession);
};
