"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentSessionSchema = exports.CartItemSchema = void 0;
const zod_1 = require("zod");
exports.CartItemSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Product name is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
exports.CreatePaymentSessionSchema = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z.array(exports.CartItemSchema).nonempty("At least one item is required in the cart")
    })
});
