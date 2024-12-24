import express from "express";
import {getAdminStatistics, getStudentCountBarChartData, getAttendanceBarChartData} from "./admin.controller";

const router = express.Router();

// endpoint: edufusion.com/api/v1/user/admin/statistics
router.get("/statistics", getAdminStatistics);
// endpoint: edufusion.com/api/v1/user/admin/student-count-bar-chart-data
router.get("/student-count-bar-chart-data", getStudentCountBarChartData);
// endpoint: edufusion.com/api/v1/user/admin/attendance-bar-chart-data
router.get("/attendance-bar-chart-data", getAttendanceBarChartData);


export default router;