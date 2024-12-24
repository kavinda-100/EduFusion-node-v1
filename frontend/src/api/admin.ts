import api, {handleAxiosError} from "@/api/index.ts";

export const fetchStatistics = async () => {
    try {
        return await api.get("/user/admin/statistics");
    } catch (error) {
        handleAxiosError(error);
    }
};

export const getStudentCountChartData = async () => {
    try {
        return await api.get("/user/admin/student-count-bar-chart-data");
    } catch (error) {
        handleAxiosError(error);
    }
}

export const getStudentAttendanceChartData = async () => {
    try {
        return await api.get("/user/admin/attendance-bar-chart-data");
    } catch (error) {
        handleAxiosError(error);
    }
}