import { Separator } from "@/components/ui/separator";
import CreateUser from "@/section/admin/components/CreateUser.tsx";
import UpdateUser from "@/section/admin/components/UpdateUser.tsx";
import UserTable from "@/section/admin/table/UserTable.tsx";

const MangeUser = () => {
  return (
    <div className={"w-full h-auto flex-col gap-3"}>
      <div className={"w-full h-auto flex flex-col lg:flex-row gap-3"}>
        <CreateUser />
        <UpdateUser />
      </div>
      <Separator className={"w-full my-2"} />
      <div className={"container mx-auto h-auto mt-4 border rounded-md p-2"}>
        <h1 className="text-md lg:text-lg font-semibold text-muted-foreground">
          All Users
        </h1>
        <UserTable />
      </div>
    </div>
  );
};

export default MangeUser;
