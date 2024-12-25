import {useAppSelector} from "@/store/hooks.ts";
import TeacherAssignment from "@/section/teacher/TeacherAssignment.tsx";
import StudentAssignment from "@/section/student/StudentAssignment.tsx";


const Assignment = () => {
    const {user} = useAppSelector(state => state.user);

    return (
        <>
            {
                user?.role === 'teacher' ? (<TeacherAssignment />) : (<StudentAssignment />)
            }
        </>
    );
};

export default Assignment;