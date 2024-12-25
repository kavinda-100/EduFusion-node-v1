import {LearnerSupportType} from "@/types";
import { DataTable } from "@/components/DataTable.tsx";
import { ExportToExcel } from "@/lib/xlsx.ts";
import {LearnerSupportColumns} from "@/section/teacher/table/LearnerSupportCoulums.tsx";

type LearnerSupportProps = {
  learnerSupport: LearnerSupportType[];
};

const LeanerSupportTable = ({ learnerSupport }: LearnerSupportProps) => {
  // Export to Excel
  const handleExport = () => {
    ExportToExcel(learnerSupport, "All Announcements", "Announcements");
  };
  return (
    <section className={"w-full container mx-auto"}>
      <DataTable
        columns={LearnerSupportColumns}
        data={learnerSupport}
        NameForFilter={"userName"}
        FilterInputPlaceholder={"Filter by user name"}
        ExportToExcel={handleExport}
      />
    </section>
  );
};

export default LeanerSupportTable;
