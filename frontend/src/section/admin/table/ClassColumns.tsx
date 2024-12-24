import { ColumnDef } from "@tanstack/react-table";
import { ClassType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

export const ClassColumns: ColumnDef<ClassType>[] = [
  {
    accessorKey: "class_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const className = row.original.class_name;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {className}
        </p>
      );
    },
  },
  {
    accessorKey: "class_code",
    header: "Class Code",
    cell: ({ row }) => {
      const classCode = row.original.class_code;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {classCode}
        </p>
      );
    },
  },
  {
    accessorKey: "instructor_id",
    header: "Class Teacher",
    cell: ({ row }) => {
      const instructor = row.original.instructor_id;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {instructor}
        </p>
      );
    },
  },
  {
    accessorKey: "course_codes",
    header: "Courses",
    cell: ({ row }) => {
      const courseCodes = row.original.course_codes;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {courseCodes?.map((course, index) => (
              <DropdownMenuItem key={index}>
                {course.course_code}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const classes = row.original;
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
              onClick={() => navigator.clipboard.writeText(classes.class_code)}
            >
              Copy class code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
