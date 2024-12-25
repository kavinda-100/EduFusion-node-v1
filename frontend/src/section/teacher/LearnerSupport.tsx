import {
    Card,
    CardContent, CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import {generateFakeLearnerSupportRequests} from "@/lib/data.ts";
import LearnerSupportTable from "@/section/teacher/table/LearnerSupportTable.tsx";

const LearnerSupport = () => {
  //* simulate the data
  const FakeLearnerSupports = generateFakeLearnerSupportRequests(50);

  return (
    <section className={"w-full h-full p-2"}>
      <Card className={"mt-4"}>
        <CardHeader>
          <CardTitle>Learner Support </CardTitle>
            <CardDescription>
                This is where you can see all the learner support requests
            </CardDescription>
        </CardHeader>
        <CardContent>
          <LearnerSupportTable learnerSupport={FakeLearnerSupports} />
        </CardContent>
      </Card>
    </section>
  );
};

export default LearnerSupport;
