import { Skeleton } from "@/components/ui/skeleton"

const StatCardSkeleton = () => {
    return (
        <Skeleton className={"min-w-[250px] min-h-[200px] p-5 rounded-lg"}>
           <div className={"flex justify-center items-center"}>
               <Skeleton className={"w-12 h-12 rounded-full"}/>
               <Skeleton className={"w-full h-5 rounded ml-5"}/>
           </div>
            <div className={"mt-6"}>
                <Skeleton className={"w-6 h-6 rounded mt-3"}/>
            </div>
            <div className={"mt-6"}>
                <Skeleton className={"w-24 h-4 rounded"}/>
                <Skeleton className={"w-24 h-4 rounded mt-2"}/>
            </div>
        </Skeleton>
    );
};

export default StatCardSkeleton;