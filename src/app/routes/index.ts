import Router from "express";
import { StudentRoutes } from "../../modules/student/students.route";
import { UserRoutes } from "../../modules/user/user.routes";
const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/student",
    route: StudentRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
