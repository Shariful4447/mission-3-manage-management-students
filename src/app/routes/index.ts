import Router from "express";
import { StudentRoutes } from "../../modules/student/students.route";
import { UserRoutes } from "../../modules/user/user.routes";
import { AcademicSemesterRoute } from "../../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../../modules/academicFaculty/academicfaculty.route";
import { AcademicDepartmentRoutes } from "../../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../../modules/Faculty/faculty.route";
import { AdminRoutes } from "../../modules/Admin/admin.route";
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
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoute,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
