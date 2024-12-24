import { SidebarMenuItemType } from "@/types";
import {
  BadgeCheck,
  Bell,
  BookCopy,
  ChartColumnBig,
  CloudUpload,
  Hand,
  LayoutDashboard,
  Notebook,
  School,
  Users,
} from "lucide-react";
import { StatCardProps } from "@/components/dasboard/owerview/StatCard.tsx";

export const SIDEBAR_MENU: SidebarMenuItemType[] = [
  //
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    isForRole: ["admin", "student", "teacher"],
  },
  {
    title: "Reports",
    icon: ChartColumnBig,
    href: "/dashboard/reports",
    isForRole: ["admin", "teacher", "student"],
  },
  {
    title: "Assignments",
    icon: Notebook,
    href: "/dashboard/assignments",
    isForRole: ["student", "teacher"],
  },
  {
    title: "Announcements",
    icon: Bell,
    href: "/dashboard/announcements",
    isForRole: ["teacher", "student"],
  },
  {
    title: "Learner Support",
    icon: Hand,
    href: "/dashboard/learner-support",
    isForRole: ["teacher", "student"],
  },
  // admin
  {
    title: "Manage Classes",
    icon: School,
    href: "/dashboard/admin/manage-class",
    isForRole: ["admin"],
  },
  {
    title: "Manage Users",
    icon: Users,
    href: "/dashboard/admin/manage-user",
    isForRole: ["admin"],
  },
  {
    title: "Manage Courses",
    icon: Notebook,
    href: "/dashboard/admin/manage-course",
    isForRole: ["admin"],
  },
  // teacher
  {
    title: "Attendance",
    icon: BadgeCheck,
    href: "/dashboard/teacher/attendance",
    isForRole: ["teacher"],
  },
  {
    title: "Upload Content",
    icon: CloudUpload,
    href: "/dashboard/teacher/upload-content",
    isForRole: ["teacher"],
  },
  // student
  {
    title: "Course Material",
    icon: BookCopy,
    href: "/dashboard/student/course-material",
    isForRole: ["student"],
  },
];

export const STATSCARD: StatCardProps[] = [
  {
    title: "Total Students",
    value: "200",
    icon: Users,
  },
  {
    title: "Total Teachers",
    value: "10",
    icon: Users,
  },
  {
    title: "Attendance Average",
    value: "90%",
    icon: BadgeCheck,
  },
  {
    title: "Exams Average",
    value: "80%",
    icon: ChartColumnBig,
  },
  {
    title: "Total Courses",
    value: "10",
    icon: Notebook,
  },
  {
    title: "Total Assignments",
    value: "10",
    icon: BookCopy,
  },
  {
    title: "Total Classes",
    value: "10",
    icon: School,
  },
  {
    title: "Course Material",
    value: "10",
    icon: BookCopy,
  },
];
