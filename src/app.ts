import express, { Request, Response } from "express";
import { StudentRoutes } from "./modules/student/student.route";
const app = express();
const port = 3000;

//parser json
app.use(express.json());
app.use("/api/student", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});
export default app;
