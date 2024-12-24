import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { zodCourseSchemaType } from "@shared/zod/course/course";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

type CourseColumnsType = Omit<
  zodCourseSchemaType,
  "course_thumbnail_fileId" | "file_urls"
>;

export const CourseColumns: ColumnDef<CourseColumnsType>[] = [
  {
    accessorKey: "course_thumbnail",
    header: "Course Thumbnail",
    cell: ({ row }) => {
      const courseThumbnail = row.original.course_thumbnail;
      return (
        <Avatar>
          <AvatarImage src={courseThumbnail} alt="course thumbnail" />
          <AvatarFallback>
            {row.original.course_name[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "course_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const courseName = row.original.course_name;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {courseName}
        </p>
      );
    },
  },
  {
    accessorKey: "course_code",
    header: "Course Code",
    cell: ({ row }) => {
      const courseCode = row.original.course_code;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {courseCode}
        </p>
      );
    },
  },
  {
    accessorKey: "course_description",
    header: "Course Description",
    cell: ({ row }) => {
      const courseDescription = row.original.course_description;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {courseDescription.substring(0, 50) + "..."}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.course_code)}
            >
              Copy course code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
