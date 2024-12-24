import React from "react";
import { LucideProps } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { getCurrentFormattedDate, getCurrentTime } from "@/lib/utils.ts";

export type StatCardProps = {
  title: string;
  value: string;
  icon: React.ElementType<LucideProps>;
};

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  const formattedDate = getCurrentFormattedDate();

  return (
    <Card className={"flex flex-col justify-between w-full min-w-[250px]"}>
      <CardHeader>
        <div className={"flex gap-3 justify-start items-center"}>
          <Icon size={30} />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <h1
          className={
            "font-bold text-xl lg:text-2xl text-gray-600 dark:text-gray-500"
          }
        >
          {value}
        </h1>
      </CardContent>
      <CardFooter>
        <div>
          <p className={"text-sm font-medium text-gray-400 dark:text-gray-500"}>
            Last updated on
          </p>
          <p
            className={
              "text-sm text-pretty font-medium text-gray-500 dark:text-gray-400"
            }
          >
            {getCurrentTime()} - {formattedDate}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StatCard;
