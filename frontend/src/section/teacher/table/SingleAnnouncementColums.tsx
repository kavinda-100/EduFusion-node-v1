import { ColumnDef } from "@tanstack/react-table";
import { SingleAnnouncementType } from "@/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

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
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.original.subject;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {subject}
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
];
