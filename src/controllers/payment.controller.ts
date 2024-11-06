import Stripe from "stripe";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { z } from "zod";
import { CartItemSchema } from "../schemas/payment.schema";
import { ApiResponse } from "../utils/ApiResponse";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion:"2024-10-28.acacia"})

export const createPaymentSession = asyncHandler(
  async (req: Request | any, res: Response) => {

    const { items }: {items: z.infer<typeof CartItemSchema>[]} = req.body;

    const itemsParam = encodeURIComponent(JSON.stringify(items));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items?.map(item => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price*100,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_SUCCESS_URL}&items=${itemsParam}`,
        cancel_url: `${process.env.CLIENT_CANCEL_URL}&items=${itemsParam}`,
      })

    return res
      .status(200)
      .json(new ApiResponse(200, {url:session?.url}, "Session Created"))
  }
);
