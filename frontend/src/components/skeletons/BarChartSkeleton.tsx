import { Skeleton } from "@/components/ui/skeleton"


const BarChartSkeleton = () => {
    return (
        <Skeleton className={"h-[300px] lg:h-[400px] max-w-5xl p-6"}>
            <div className={"flex flex-col gap-3"}>
                <Skeleton className={"h-5 w-[100px]"}/>
                <Skeleton className={"h-4 w-[80px]"}/>
            </div>
            <Skeleton className={"h-[100px] lg:h-[200px] w-full mt-6"} />
            <div className={"w-full flex justify-center items-center gap-3 mt-3"}>
                <Skeleton className={"h-4 w-4"}/>
                <Skeleton className={"h-4 w-4"}/>
            </div>
            <div className={"mt-3"}>
                <Skeleton className={"h-4 w-full"}/>
            </div>
        </Skeleton>
    );
};

export default BarChartSkeleton;