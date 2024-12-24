import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, UserPen } from "lucide-react";
import { SIDEBAR_MENU } from "@/constant";
import { useAppSelector } from "@/store/hooks.ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useTheme } from "@/components/ThemeProvider.tsx";

export function AppSidebar() {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();

  return (
    <Sidebar>
      <SidebarHeader>
        <img
          src={theme.theme === "dark" ? "/dark_logo.svg" : "/light_logo.svg"}
          alt={"logo"}
          className={"size-auto object-cover"}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {user &&
                SIDEBAR_MENU.map(
                  ({ title, icon: Icon, isForRole, href }, index) => {
                    if (isForRole.includes(user.role)) {
                      return (
                        <SidebarMenuItem key={index}>
                          <Link to={href}>
                            <SidebarMenuButton
                              className={
                                location.pathname === href
                                  ? "bg-gray-400 dark:bg-gray-800"
                                  : ""
                              }
                            >
                              <div
                                className={
                                  "flex gap-2 justify-center items-center"
                                }
                              >
                                <Icon className="size-5" />
                                {title}
                              </div>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      );
                    }
                  },
                )}
              {!user && (
                <SidebarMenuItem>
                  <SidebarMenuButton>Something went wrong</SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      {/* sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {/* avatar */}
                  <Avatar className={"w-7 h-7"}>
                    <AvatarImage
                      src={user?.profilePicture || ""}
                      alt={user?._id}
                      className={"object-cover"}
                    />
                    <AvatarFallback>
                      {user?.firstName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {/* greet */}
                  <p className={"font-medium text-pretty"}>
                    <span className={"text-violet-600 font-bold"}>
                      {user?.firstName || "user"}
                    </span>
                  </p>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/profile")}
                >
                  <UserPen className={"size-4"} />
                  <span>Profile</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
