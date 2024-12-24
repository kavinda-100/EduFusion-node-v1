import { SingleAnnouncementType } from "@/types";
import { DataTable } from "@/components/DataTable.tsx";
import { SingleAnnouncementColumns } from "@/section/teacher/table/SingleAnnouncementColums.tsx";
import { ExportToExcel } from "@/lib/xlsx.ts";

type SingleAnnouncementProps = {
  announcements: SingleAnnouncementType[];
};

const AnnouncementTable = ({ announcements }: SingleAnnouncementProps) => {
  // Export to Excel
  const handleExport = () => {
    ExportToExcel(announcements, "All Announcements", "Announcements");
  };
  return (
    <section className={"w-full container mx-auto"}>
      <DataTable
        columns={SingleAnnouncementColumns}
        data={announcements}
        NameForFilter={"userName"}
        FilterInputPlaceholder={"Filter by user name"}
        ExportToExcel={handleExport}
      />
    </section>
  );
};

export default AnnouncementTable;
