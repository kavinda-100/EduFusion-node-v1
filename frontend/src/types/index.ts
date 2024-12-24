import React from "react";
import { LucideProps } from "lucide-react";
import { z } from "zod";
import { zodClassSchema } from "@shared/zod/class/class.ts";

export type ClassType = z.infer<typeof zodClassSchema>;

type isForRole = "admin" | "student" | "teacher";

export type SidebarMenuItemType = {
  title: string;
  icon: React.ElementType<LucideProps>;
  href: string;
  isForRole: isForRole[];
};

export type BarChartDataType = {
  month: string;
  label1: number;
  label2: number;
};

export type RadialChartDataType = {
  browser: string;
  average: number;
  fill: string;
  subject: string;
};

export type SingleAnnouncementType = {
  subject: string;
  replies: number;
  userName: string;
  thumbnail: string;
};
