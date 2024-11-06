"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiResponse_1 = require("../utils/ApiResponse");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-10-28.acacia" });
exports.createPaymentSession = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req.body;
    const itemsParam = encodeURIComponent(JSON.stringify(items));
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items === null || items === void 0 ? void 0 : items.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            };
        }),
        success_url: `${process.env.CLIENT_SUCCESS_URL}&items=${itemsParam}`,
        cancel_url: `${process.env.CLIENT_CANCEL_URL}&items=${itemsParam}`,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, { url: session === null || session === void 0 ? void 0 : session.url }, "Session Created"));
}));
