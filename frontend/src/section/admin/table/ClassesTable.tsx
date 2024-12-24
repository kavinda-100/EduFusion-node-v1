import { DataTable } from "@/components/DataTable.tsx";
import { ClassColumns } from "@/section/admin/table/ClassColumns.tsx";
import { ExportToExcel } from "@/lib/xlsx.ts";
import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "@/api/class.ts";

const ClassesTable = () => {
  // const data = generateRandomClassData();
  // console.log(data);
  //* Implement the mutation for the class data
  const {
    data: classes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: getAllClasses,
  });
  console.log("Classes", classes);

  // Export to Excel
  const handleExport = () => {
    ExportToExcel(classes?.data, "Classes Data", "Classes");
  };

  return (
    <div className={"container mx-auto"}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && classes && (
        <DataTable
          columns={ClassColumns}
          data={classes.data}
          NameForFilter={"class_code"}
          FilterInputPlaceholder={"Search by class code"}
          ExportToExcel={handleExport}
        />
      )}
    </div>
  );
};

export default ClassesTable;
