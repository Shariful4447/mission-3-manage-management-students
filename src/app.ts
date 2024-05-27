import express, { NextFunction, Request, Response } from "express";
import globalErrorHandlers from "./middlewares/globalErrorHandlers";
import notFound from "./middlewares/notFoundErrorhandler";
import router from "./app/routes";
const app = express();
const port = 3000;

//parser json
app.use(express.json());
app.use("/api/v1/", router);

const test = (req: Request, res: Response) => {
  res.send("Hello");
};
app.get("/", test);

app.use(globalErrorHandlers);

// not found error
app.use(notFound);
export default app;
