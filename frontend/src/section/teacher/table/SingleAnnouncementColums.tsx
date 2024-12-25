import { ColumnDef } from "@tanstack/react-table";
import { SingleAnnouncementType } from "@/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {MoreHorizontal} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";

const navigateTo = (courseCode: string) => {
  window.location.href = `/dashboard/announcements/view/${courseCode}`;
}

export const SingleAnnouncementColumns: ColumnDef<SingleAnnouncementType>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail;
      const userName = row.original.userName;
      return (
        <Avatar>
          <AvatarImage src={thumbnail} alt={"User Avatar"} />
          <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => {
      const userName = row.original.userName;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {userName}
        </p>
      );
    },
  },
  {
    accessorKey: "courseCode",
    header: "Course Code",
    cell: ({ row }) => {
      const courseCode = row.original.courseCode;
      return (
          <p className={"truncate font-medium text-muted-foreground"}>
            {courseCode}
          </p>
      );
    },
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.original.subject;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {subject.slice(0, 70)}...
        </p>
      );
    },
  },
  {
    accessorKey: "replies",
    header: "Replies",
    cell: ({ row }) => {
      const replies = row.original.replies;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {replies}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const courseCode = row.original.courseCode;
      return(
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
                  onClick={() => navigateTo(courseCode)}
                  className={"cursor-pointer"}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
      )
    }
  }
];
