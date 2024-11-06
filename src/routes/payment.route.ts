import validate from "../middlewares/validate.middleware";
import { createPaymentSession } from "../controllers/payment.controller";
import { CreatePaymentSessionSchema } from "../schemas/payment.schema";
import { Router } from "express";

export default (router: Router) => {
  router
    .route("/payment/createPaymentSession")
    .post(validate(CreatePaymentSessionSchema), createPaymentSession);
};
