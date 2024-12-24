import {useAppSelector} from "@/store/hooks.ts";
import AdminDashboard from "@/section/admin/AdminDashboard.tsx";
import TeacherDashboard from "@/section/teacher/TeacherDashboard.tsx";
import StudentDashboard from "@/section/student/StudentDashboard.tsx";


const Dashboard = () => {
    const {user} = useAppSelector(state => state.user)

    console.log("user in Dashboard.tsx", user)
    return (
        <>
            {
                user?.role === "admin" ? (<AdminDashboard />)
                    : user?.role === "teacher" ? (<TeacherDashboard />)
                        : (<StudentDashboard />)
            }
        </>
    );
};

export default Dashboard;