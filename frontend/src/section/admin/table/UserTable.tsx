import { DataTable } from "@/components/DataTable.tsx";
import { UserColumns } from "@/section/admin/table/UserColumns.tsx";
import { ExportToExcel } from "@/lib/xlsx.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user.ts";

const UserTable = () => {
  //TODO: for simulating the data
  const [selectedRole, setSelectedRole] = useState("");
  // const [fakeUsers, setFakeUsers] = useState<zodUserSchemaType[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", selectedRole],
    queryFn: () => getAllUsers(selectedRole),
  });
  console.log("user table data", data);

  // Export to Excel
  const handleExport = () => {
    ExportToExcel(data?.data, "User Data", "Users");
  };
  return (
    <div className={"container mx-auto"}>
      {/*   filters */}
      <div className={"flex justify-end items-center"}>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {/*  table */}
      {!isLoading && !isError && data && (
        <DataTable
          columns={UserColumns}
          data={data.data}
          NameForFilter={"email"}
          FilterInputPlaceholder={"Filter by email"}
          ExportToExcel={handleExport}
        />
      )}
    </div>
  );
};

export default UserTable;
