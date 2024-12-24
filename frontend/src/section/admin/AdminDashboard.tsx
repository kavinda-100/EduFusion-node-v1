import StatCard, {StatCardProps} from "@/components/dasboard/owerview/StatCard.tsx";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {BarChartComponent} from "@/components/dasboard/owerview/BarChartComponent.tsx";
import {ChartConfig} from "@/components/ui/chart.tsx";
import StudentDetailsCard from "@/components/dasboard/owerview/StudentDetailsCard.tsx";
import ScoreCard from "@/components/dasboard/owerview/ScoreCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {BadgeCheck, BookCopy, ChartColumnBig, Notebook, School, Users } from "lucide-react";
import React, { useState , useEffect} from "react";
import StatCardSkeleton from "@/components/skeletons/StatCardSkeleton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {fetchStatistics, getStudentAttendanceChartData, getStudentCountChartData} from "@/api/admin.ts";
import BarChartSkeleton from "@/components/skeletons/BarChartSkeleton.tsx";

//TODO: data format for the BarChart
// const chartData = [
//     { month: "January", male: 186, female: 80 },
//     { month: "February", male: 160, female: 200 },
//     { month: "March", male: 170, female: 150 },
//     { month: "April", male: 180, female: 130 },
//     { month: "May", male: 190, female: 140 },
//     { month: "June", male: 200, female: 120 },
//     { month: "July", male: 210, female: 110 },
//     { month: "August", male: 220, female: 100 },
//     { month: "September", male: 230, female: 90 },
//     { month: "October", male: 240, female: 80 },
//     { month: "November", male: 250, female: 70 },
// ];

const chartConfig = {
    desktop: {
        label: "Male",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Female",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

type IconMappingType = {
    [key: string]: React.ElementType;
}

type StatItem = {
    title: string;
    value: string;
};

const iconMapping: IconMappingType = {
    "Total Students": Users,
    "Total Instructors": Users,
    "Attendance Average": BadgeCheck,
    "Exams Average": ChartColumnBig,
    "Total Courses": Notebook,
    "Total Assignments": BookCopy,
    "Total Classes": School,
    "Course Materials": BookCopy,
};



const AdminDashboard = () => {
    // const StudentCountChartData = generateBarChartData();
    // const StudentAttendanceChartData = generateBarChartData();
    const [statCards, setStatCards] = useState<StatCardProps[]>([]);


    //TODO: get the data from the server for statistics cards
    const {
        data: statData,
        isLoading: isStatLoading,
        isSuccess: isStatSuccess,
        isError: isStatError,
        error: statError,
        refetch: refetchStat,
    } = useQuery({
        queryKey: ["statistics", "admin"],
        queryFn: fetchStatistics,
        refetchOnWindowFocus: false,
    })
    //set the data to the statCards
    useEffect(() => {
        if (statData && statData?.data && statData.data.data) {
            const mergedData = statData?.data?.data.map((item: StatItem) => ({
                ...item,
                icon: iconMapping[item.title] || null,
            }));
            setStatCards(mergedData);
        }
    }, [statData]);
    // console.log("stat data", statData);
    // console.log("stat error", statError);

    //TODO: get the data from the server for student count BarChart
    const {
        data: StudentCountBarChartData,
        isLoading: isStudentBarChartCountLoading,
        isSuccess: isStudentBarChartCountSuccess,
        isError: isStudentBarChartCountError,
        error: StudentBarChartCountError,
        refetch: refetchStudentBarChartCount,
    } = useQuery({
        queryKey: ["studentCountBarChartData", "admin"],
        queryFn: getStudentCountChartData,
        refetchOnWindowFocus: false,
    })
    // console.log("StudentCountBarChartData", StudentCountBarChartData);

    //TODO: get the data from the server for student attendance BarChart
    const {
        data: StudentAttendanceBarChartData,
        isLoading: isStudentAttendanceBarChartLoading,
        isSuccess: isStudentAttendanceBarChartSuccess,
        isError: isStudentAttendanceBarChartError,
        error: StudentAttendanceBarChartError,
        refetch: refetchStudentAttendanceBarChart,
    } = useQuery({
        queryKey: ["studentAttendanceBarChartData", "admin"],
        queryFn: getStudentAttendanceChartData,
        refetchOnWindowFocus: false,
    })

    return (
        <section className={"w-full h-full"}>
            {/* statistics */}
            <div className={"max-w-[1200px] mx-auto"}>
                {
                    isStatError &&
                    <div className={"flex gap-3 justify-center items-center p-4"}>
                        <h1 className={"text-red-500 text-pretty font-bold"}>Failed to load data {statError?.message}</h1>
                        <Button onClick={() => refetchStat()} className={"bg-primary text-white"}>ReFetch</Button>
                    </div>
                }
                <ScrollArea className={"w-full"}>
                    <div className={"flex gap-3"}>
                        {
                            isStatLoading && (
                                <ScrollArea className={"w-full my-2"}>
                                    <div className={"flex gap-3"}>
                                        {
                                            Array.from({length: 8}).map((_, index) => (
                                                <StatCardSkeleton key={index}/>
                                            ))
                                        }
                                    </div>
                                    <ScrollBar orientation={"horizontal"}/>
                                </ScrollArea>
                            )
                        }
                        {
                            !isStatLoading && !isStatError && isStatSuccess && statCards.map((item, index) => (
                                <StatCard
                                    key={index}
                                    title={item.title}
                                    value={item.value}
                                    icon={item.icon}
                                />
                            ))
                        }
                    </div>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
            </div>
            {/* char and others */}
            <div className={"flex flex-col lg:flex-row gap-3 w-full mt-3"}>
                {/* charts */}
                <div className={"flex flex-col gap-3 w-full lg:w-1/2"}>
                    {/* student Count */}
                    {
                        isStudentBarChartCountError &&
                        <div className={"flex gap-3 justify-center items-center p-4"}>
                            <h1 className={"text-red-500 text-pretty font-bold"}>Failed to load data {StudentBarChartCountError?.message}</h1>
                            <Button onClick={() => refetchStudentBarChartCount()} className={"bg-primary text-white"}>ReFetch</Button>
                        </div>
                    }
                    {
                        isStudentBarChartCountLoading && (
                            <BarChartSkeleton/>
                        )
                    }
                    {
                        !isStudentBarChartCountError && !isStudentBarChartCountLoading && isStudentBarChartCountSuccess && (
                            <BarChartComponent
                                chartData={StudentCountBarChartData?.data?.data}
                                chartConfig={chartConfig}
                                dataKey={"month"}
                                subDataKey1={"male"}
                                subDataKey2={"female"}
                                cardTitle={"Student Count"}
                                footerTitle={`Showing total Student Count for the last ${new Date().getMonth() + 1} months`}
                            />
                        )
                    }
                    {/* student Attendance */}
                    {
                        isStudentAttendanceBarChartError &&
                        <div className={"flex gap-3 justify-center items-center p-4"}>
                            <h1 className={"text-red-500 text-pretty font-bold"}>Failed to load data {StudentAttendanceBarChartError?.message}</h1>
                            <Button onClick={() => refetchStudentAttendanceBarChart()} className={"bg-primary text-white"}>ReFetch</Button>
                        </div>
                    }
                    {
                        isStudentAttendanceBarChartLoading && (
                            <BarChartSkeleton/>
                        )
                    }
                    {
                        !isStudentAttendanceBarChartError && !isStudentAttendanceBarChartLoading && isStudentAttendanceBarChartSuccess && (
                            <BarChartComponent
                                chartData={StudentAttendanceBarChartData?.data?.data}
                                chartConfig={chartConfig}
                                dataKey={"month"}
                                subDataKey1={"male"}
                                subDataKey2={"female"}
                                cardTitle={"Student Attendance"}
                                footerTitle={`Showing total Student Attendance for the last ${new Date().getMonth() + 1} months`}
                            />
                        )
                    }
                </div>
                {/* others */}
                <div className={"flex flex-col gap-3 w-full lg:w-1/2"}>
                    {/*student best details*/}
                    <StudentDetailsCard />
                    {/* subject scores */}
                    <ScoreCard />
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;