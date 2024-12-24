import { zodUserSchemaType } from "@shared/zod/user/user.zod";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils.ts";

export const UserColumns: ColumnDef<zodUserSchemaType>[] = [
  {
    accessorKey: "profilePicture",
    header: "Profile Picture",
    cell: ({ row }) => {
      const profile = row.original.profilePicture;
      const name = row.original.firstName;
      return (
        <Avatar>
          <AvatarImage src={profile} alt="profile picture" />
          <AvatarFallback>{name[0].toLocaleUpperCase()}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {firstName}
        </p>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const lastName = row.original.lastName;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>{email}</p>
      );
    },
  },
  {
    accessorKey: "gender",
    cell: ({ row }) => {
      const gender = row.original.gender;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>{gender}</p>
      );
    },
  },
  {
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>{role}</p>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber;
      return (
        <p className={"truncate font-medium text-muted-foreground"}>
          {phoneNumber}
        </p>
      );
    },
  },
  {
    accessorKey: "address",
    cell: ({ row }) => {
      const address = row.original.address;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <DropdownMenuLabel>Street</DropdownMenuLabel>
              <p>{address?.street}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuLabel>City</DropdownMenuLabel>
              <p>{address?.city}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuLabel>Country</DropdownMenuLabel>
              <p>{address?.country}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuLabel>Zip Code</DropdownMenuLabel>
              <p>{address?.zipCode}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "isActive",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <p
          className={cn("truncate font-medium text-muted-foreground", {
            "text-green-500 font-bold": isActive,
          })}
        >
          {isActive ? "Active" : "Inactive"}
        </p>
      );
    },
  },
  {
    accessorKey: "isEmailVerified",
    cell: ({ row }) => {
      const isEmailVerified = row.original.isEmailVerified;
      return (
        <p
          className={cn("truncate font-medium text-muted-foreground", {
            "text-green-500 font-bold": isEmailVerified,
          })}
        >
          {isEmailVerified ? "Verified" : "Not Verified"}
        </p>
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
              onClick={() => navigator.clipboard.writeText(classes.email)}
              className={"cursor-pointer"}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
