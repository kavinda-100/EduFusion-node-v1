import { useAppSelector } from "@/store/hooks.ts";
import { AdminReports } from "@/section/admin";

const Reports = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      {user?.role === "admin" ? (
        <AdminReports />
      ) : user?.role === "teacher" ? (
        <h1>Teacher Reports</h1>
      ) : (
        <h1>Student Reports</h1>
      )}
    </>
  );
};

export default Reports;
