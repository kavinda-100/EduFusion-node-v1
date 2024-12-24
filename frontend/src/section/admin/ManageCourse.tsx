import { Separator } from "@/components/ui/separator.tsx";
import CreateCourse from "@/section/admin/components/CreateCourse.tsx";
import UpdateCourse from "@/section/admin/components/UpdateCourse.tsx";
import AddUserToCourse from "@/section/admin/components/AddUserToCourse.tsx";
import UpdateUserInCourse from "@/section/admin/components/UpdateUserInCourse.tsx";
import CourseTable from "@/section/admin/table/CourseTable.tsx";

const ManageCourse = () => {
  return (
    <div className={"w-full h-auto flex-col gap-3"}>
      <div className={"w-full h-auto flex flex-col lg:flex-row gap-3"}>
        <CreateCourse />
        <UpdateCourse />
      </div>
      <Separator className={"w-full my-2"} />
      <div className={"w-full h-auto flex flex-col lg:flex-row gap-3"}>
        <AddUserToCourse />
        <UpdateUserInCourse />
      </div>
      <Separator className={"w-full my-2"} />
      <div className={"container mx-auto h-auto mt-4 border rounded-md p-2"}>
        <h1 className="text-md lg:text-lg font-semibold text-muted-foreground">
          All Courses
        </h1>
        <CourseTable />
      </div>
    </div>
  );
};

export default ManageCourse;
