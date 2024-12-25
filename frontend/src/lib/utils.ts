import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RadialChartDataType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentFormattedDate = () => {
  // get the current date and format it
  const date = new Date();
  const options = { year: "numeric", month: "long" } as const;
  return date.toLocaleDateString("en-US", options);
};

export const generateBarChartData = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];
  return months.map((month, index) => ({
    month,
    male: 150 + index * 10 + Math.floor(Math.random() * 50),
    female: 50 + index * 10 + Math.floor(Math.random() * 50),
  }));
};

export const radialChartDataGenerator = () => {
  const subjects = [
    "Math",
    "Science",
    "English",
    "History",
    "Geography",
    "Art",
    "Music",
    "Physics",
  ];
  const data: RadialChartDataType[][] = [];

  for (let i = 0; i < subjects.length; i++) {
    const chartData: RadialChartDataType[] = [];
    chartData.push({
      browser: "safari",
      average: Math.floor(Math.random() * 51) + 50,
      fill: "var(--color-safari)",
      subject: subjects[i],
    });
    data.push(chartData);
  }

  return data;
};

export const validateClassName = (className: string) => {
  const regex = /^G[1-9][A-D]Class$/;
  return regex.test(className);
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const generateIDs = (length: number, code: string) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let randomizing = ''
    for (let i = 0; i < length; i++) {
        randomizing += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${code}_${randomizing}`;
}
