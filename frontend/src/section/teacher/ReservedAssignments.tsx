import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {generateFakeAssignments} from "@/lib/data.ts";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import AssignmentCard from "@/section/teacher/components/AssignmentCard.tsx";


const ReservedAssignments = () => {
    const [courseCodes, setCourseCodes] = React.useState<string[]>(["EEI4366", "EEY4189", "EEI4369"])//TODO: get from backend
    const [selectedCourse, setSelectedCourse] = React.useState<string>("")

    const FakeAssignments = generateFakeAssignments(5, selectedCourse)
    console.log(FakeAssignments)


    return (
        <Card className={"max-w-[800px] mt-6"}>
            <CardHeader>
                <CardTitle>ReservedAssignments</CardTitle>
                <CardDescription>
                    A list of assignments that have been reserved by students.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"w-full h-auto flex justify-end items-center"}>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                courseCodes.map((code) => (
                                    <SelectItem key={code} value={code.toLowerCase()}>
                                        {code}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            {/*    Assignments */}
                <ScrollArea className={"mt-4 w-full h-[500px]"}>
                    <div className={"w-full"}>
                        {
                            FakeAssignments.map((assignment, index) => (
                                <AssignmentCard key={index} assignment={assignment} />
                            ))
                        }
                    </div>
                    <ScrollBar orientation={"vertical"}/>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ReservedAssignments;