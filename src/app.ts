import express, { NextFunction, Request, Response } from "express";
import { StudentRoutes } from "./modules/student/students.route";
import { UserRoutes } from "./modules/user/user.routes";
import globalErrorHandlers from "./middlewares/globalErrorHandlers";
const app = express();
const port = 3000;

//parser json
app.use(express.json());
app.use("/api/student", StudentRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.use(globalErrorHandlers);
export default app;
