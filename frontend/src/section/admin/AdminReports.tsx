import ClassesTable from "@/section/admin/table/ClassesTable.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import CourseTable from "@/section/admin/table/CourseTable.tsx";
import UserTable from "@/section/admin/table/UserTable.tsx";

const AdminReports = () => {
  return (
    <section className={"container mx-auto"}>
      <div className={"container mx-auto h-auto mt-4 border rounded-md p-2"}>
        <h1 className="text-md lg:text-lg font-semibold text-muted-foreground">
          All Classes
        </h1>
        <ClassesTable />
      </div>
      <Separator className={"w-full my-2"} />
      <div className={"container mx-auto h-auto mt-4 border rounded-md p-2"}>
        <h1 className="text-md lg:text-lg font-semibold text-muted-foreground">
          All Courses
        </h1>
        <CourseTable />
      </div>
      <Separator className={"w-full my-2"} />
      <div className={"container mx-auto h-auto mt-4 border rounded-md p-2"}>
        <h1 className="text-md lg:text-lg font-semibold text-muted-foreground">
          All Users
        </h1>
        <UserTable />
      </div>
    </section>
  );
};

export default AdminReports;
