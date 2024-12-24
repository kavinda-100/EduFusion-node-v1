import { DataTable } from "@/components/DataTable.tsx";
import { CourseColumns } from "@/section/admin/table/CourseColumns.tsx";
import { ExportToExcel } from "@/lib/xlsx.ts";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "@/api/course.ts";

const CourseTable = () => {
  // for simulating the data
  // const fakeCourses = generateFakeCourse(50);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  // Export to Excel
  const handleExport = () => {
    ExportToExcel(data?.data, "Course Data", "Courses");
  };
  return (
    <div className={"container mx-auto"}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && data && (
        <DataTable
          columns={CourseColumns}
          data={data.data}
          NameForFilter={"course_code"}
          FilterInputPlaceholder={"Filter by course code"}
          ExportToExcel={handleExport}
        />
      )}
    </div>
  );
};

export default CourseTable;
