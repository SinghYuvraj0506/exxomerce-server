import { z } from "zod";

export const CartItemSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const CreatePaymentSessionSchema = z.object({
  body: z.object({
  items: z.array(CartItemSchema).nonempty("At least one item is required in the cart")
  })
});
