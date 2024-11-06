import express from "express";
const router = express.Router();
import PaymentRouter from "./payment.route"

export default (): express.Router => {
  PaymentRouter(router);
  return router;
};
