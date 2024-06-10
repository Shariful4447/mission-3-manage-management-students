import Router from "express";
import { StudentRoutes } from "../../modules/student/students.route";
import { UserRoutes } from "../../modules/user/user.routes";
import { AcademicSemesterRoute } from "../../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../../modules/academicFaculty/academicfaculty.route";
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
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoute,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
