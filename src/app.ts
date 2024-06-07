import express, { Application, Request, Response } from "express";
import globalErrorHandlers from "./middlewares/globalErrorHandlers";
import notFound from "./middlewares/notFoundErrorhandler";
import router from "./app/routes";
import cors from "cors";
const app: Application = express();

//parser json
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/", router);

const test = (req: Request, res: Response) => {
  res.send("Hello");
};

app.get("/", test);

// global error handlers
app.use(globalErrorHandlers);

// not found error
app.use(notFound);
export default app;
