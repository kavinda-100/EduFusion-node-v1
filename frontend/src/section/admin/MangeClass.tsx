import CreateClass from "@/section/admin/components/CreateClass.tsx";
import UpdateClass from "@/section/admin/components/UpdateClass.tsx";

import { Separator } from "@/components/ui/separator";
import AddStudentToClass from "@/section/admin/components/AddStudentToClass.tsx";
import UpdateStudentToClass from "@/section/admin/components/UpdateStudentToClass.tsx";
import ClassesTable from "@/section/admin/table/ClassesTable.tsx";

const MangeClass = () => {
  return (
    <div className={"w-full h-auto flex-col gap-3"}>
      <div className={"w-full h-auto flex flex-col lg:flex-row gap-3"}>
        <CreateClass />
        <UpdateClass />
      </div>
      <Separator className={"w-full my-2"} />
      <div className={"w-full h-auto flex flex-col lg:flex-row gap-3"}>
        <AddStudentToClass />
        <UpdateStudentToClass />
      </div>
      <div className={"container mx-auto h-auto mt-4 border rounded-md p-2"}>
        <h1 className="text-md lg:text-lg font-semibold text-muted-foreground">
          All Classes
        </h1>
        <ClassesTable />
      </div>
    </div>
  );
};

export default MangeClass;
