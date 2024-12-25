import { ColumnDef } from "@tanstack/react-table";
import {LearnerSupportType} from "@/types";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";

const navigateTo = ({username, subject}: {username: string, subject: string}) => {
    window.location.href = `/dashboard/learner-support/reply/${username}?subject=${subject}`;
}

export const LearnerSupportColumns: ColumnDef<LearnerSupportType>[] = [
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
        cell: ({row}) => {
            const username = row.original.userName;
            const subject = row.original.subject;
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
                            onClick={() => navigateTo({username, subject})}
                            className={"cursor-pointer"}
                        >
                            View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
];
