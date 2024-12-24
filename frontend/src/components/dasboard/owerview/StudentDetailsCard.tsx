import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";

const StudentDetailsCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Details</CardTitle>
                <CardDescription>Grade 01</CardDescription>
            </CardHeader>
            <CardContent>
                {/* for the dropDown menu*/}
                <div className={"flex justify-end items-center"}>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="grade-01">Grade 01</SelectItem>
                            <SelectItem value="grade-02">Grade 02</SelectItem>
                            <SelectItem value="grade-03">Grade 03</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            {/*for the details*/}
                 {/*for desktop view */}
                <div className={"hidden lg:flex gap-2 justify-center items-center mt-4 w-full"}>
                    <IndividualStudentDetails name={"Peter"} email={"peter@gmail.com"} avatar={""} grade={"Best in Marks"}/>
                    <IndividualStudentDetails name={"Jane"} email={"jane@gmail.com"} avatar={""} grade={"Best in Attendance"}/>
                    <IndividualStudentDetails name={"John"} email={"john@gmail.com"} avatar={""} grade={"Best in Course"}/>
                </div>
                {/*for mobile view */}
                <ScrollArea className={"flex lg:hidden"}>
                    <div className={"flex gap-2 justify-center items-center mt-4 w-full"}>
                        <IndividualStudentDetails name={"Peter"} email={"peter@gmail.com"} avatar={""}
                                                  grade={"Best in Marks"}/>
                        <IndividualStudentDetails name={"Jane"} email={"jane@gmail.com"} avatar={""}
                                                  grade={"Best in Attendance"}/>
                        <IndividualStudentDetails name={"John"} email={"john@gmail.com"} avatar={""}
                                                  grade={"Best in Course"}/>
                    </div>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <p>Details of the Grade 01 Students</p>
            </CardFooter>

        </Card>
    );
};

export default StudentDetailsCard;


type IndividualStudentDetailsProps = {
    name: string
    email: string
    avatar: string
    grade: string
}
const IndividualStudentDetails = ({name, email, avatar, grade}: IndividualStudentDetailsProps) => {
    return (
        <Card className={"w-full flex flex-col justify-between items-center"}>
            <CardHeader>
                <div className={"flex justify-center items-center"}>
                    <Avatar>
                        <AvatarImage src={avatar} className={"size-20"}/>
                        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </CardHeader>
            <CardContent>
                <h1 className={"text-center font-normal text-sm text-gray-500"}>{email}</h1>
                <h2 className={"text-center font-medium text-sm"}>{name}</h2>
            </CardContent>
            <CardFooter>
                <h1 className={"text-center text-md font-bold font-sans truncate"}>{grade}</h1>
            </CardFooter>
        </Card>
    )
}