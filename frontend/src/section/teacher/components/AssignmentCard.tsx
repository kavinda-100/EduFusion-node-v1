import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {zodCourseActivitySubmissionSchemaTypeOptional} from "@shared/zod/courseActivities/submission.ts";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";


type AssignmentCardProps = {
    assignment: zodCourseActivitySubmissionSchemaTypeOptional
}

const AssignmentCard = ({assignment}: AssignmentCardProps) => {
    return (
        <Card className={"my-3"}>
            <CardHeader>
                <CardTitle>Assignment</CardTitle>
                <CardDescription className={"flex justify-between items-center"}>
                    <p className={"font-semibold"}>Date: <span className={"text-muted-foreground font-normal"}>{assignment.submission_date.split("T")[0]}</span>
                    </p>
                    <p className={"font-semibold"}>Submitted By <span className={"text-muted-foreground font-normal"}>{assignment.student_id}</span></p>
                </CardDescription>
            </CardHeader>
            <CardContent className={"flex justify-between items-center gap-4"}>
                <div className={"flex flex-col gap-3"}>
                    <p className={"font-normal text-muted-foreground uppercase"}>{assignment.course_code}</p>
                </div>
                <div className={"flex flex-1 justify-between items-center border rounded p-2"}>
                    <p className={cn("border rounded-md p-2 capitalize", {
                        "text-green-500 border-green-500": assignment.status === "submitted",
                        "text-yellow-500 border-yellow-500": assignment.status === "pending",
                        "text-red-500 border-red-500": assignment.status === "overdue",
                        "text-blue-500 border-blue-500": assignment.status === "graded",
                    })}>{assignment.status}</p>
                    <Button className={"ml-2"} variant={"secondary"}>View</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AssignmentCard;