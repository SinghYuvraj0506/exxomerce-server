import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import { ApiError } from "./utils/ApiError";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
  res.send("Hello guys welcome to server");
});

app.use("/api/v1", router());

// 404 route handler
app.all("*", (req: Request, res: Response) => {
  throw new ApiError(404, `Route ${req.originalUrl} Not Found!!!`);
});

app.use(ErrorMiddleware);

export default app;
