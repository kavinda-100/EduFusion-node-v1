import { ModeToggle } from "@/components/ModeToggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignJustify, LogIn } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { logout } from "@/store/features/userSlice.ts";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return api.post("/auth/sign-out");
    },
    onSuccess: () => {
      dispatch(logout());
      toast.success("Signed out successfully");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to sign out");
    },
  });

  return (
    <header
      className={
        "flex justify-between items-center border-b drop-shadow h-[80px] p-2"
      }
    >
      {/* sidebar trigger */}
      <div>
        <SidebarTrigger />
      </div>
      {/* desktop navbar */}
      <div className={"hidden lg:flex justify-center items-center gap-2"}>
        {/* greet */}
        <p className={"font-medium text-pretty"}>
          Hi{" "}
          <span className={"text-violet-600 font-bold"}>
            {user?.firstName || "user"}
          </span>
        </p>
        {/* avatar */}
        <Avatar>
          <AvatarImage
            src={user?.profilePicture || ""}
            alt={user?._id}
            className={"object-cover"}
          />
          <AvatarFallback>{user?.firstName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        {/* sign out btn */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isPending}
                variant={"ghost"}
                onClick={() => mutate()}
              >
                <LogIn className={"size-5"} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* mode toggle */}
        <ModeToggle />
      </div>

      {/* mobile navbar */}
      <div className={"flex lg:hidden gap-2 justify-center items-center"}>
        {/* mode toggle */}
        <ModeToggle />
        {/* menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AlignJustify className={"size-6"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div
                className={"flex justify-center items-center gap-3"}
                onClick={() => {
                  navigate("/dashboard/profile");
                }}
              >
                <Avatar>
                  <AvatarImage
                    src={user?.profilePicture || ""}
                    alt={user?._id}
                  />
                  <AvatarFallback>
                    {user?.firstName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className={"font-medium text-pretty"}>
                  Hi{" "}
                  <span className={"text-violet-600 font-bold truncate"}>
                    {user?.firstName || "user"}
                  </span>
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                className={"w-full"}
                disabled={isPending}
                variant={"outline"}
                onClick={() => mutate()}
              >
                sign out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
