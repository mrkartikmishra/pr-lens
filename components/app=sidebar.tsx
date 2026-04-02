"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BookOpen, GitPullRequest, Github, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { NavItem, NavMain } from "@/components/man-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@/lib/auth-client";

export const navData: NavItem[] = [
  { title: "Dashboards", url: "/dashboard", icon: BookOpen },
  { title: "Repository", url: "/dashboard/repository", icon: Github },
  { title: "Reviews", url: "/dashboard/reviews", icon: BookOpen },
  { title: "Subscription", url: "/dashboard/subscription", icon: BookOpen },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || !session) return null;

  const user = session.user;
  const userName = user.name || "GUEST";
  const userEmail = user.email || "";
  const userAvatar = user.image || "";

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar
      variant="floating"
      className="p-4 h-full [&_[data-slot=sidebar-inner]]:h-full"
    >
      <div className="flex flex-col gap-6 overflow-hidden">
        <SidebarHeader className="border-b">
          <div className="flex flex-col gap-4 px-2 py-6">
            <div className="flex items-center gap-4 bg-sidebar-accent/50 hover:bg-sidebar-accent/70 px-3 py-4 rounded-lg transition-colors">
              <div className="flex justify-center items-center bg-primary rounded-full w-12 h-12 text-primary-foreground shrink-0">
                <GitPullRequest className="rounded-full w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sidebar-foreground text-xs tracking-wide">
                  Connected Account
                </p>
                <p className="font-medium text-sidebar-foreground/90 text-sm">
                  @{userName}
                </p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <div className="mb-2">
            <p className="mb-3 px-3 font-semibold text-sidebar-foreground/60 text-xs uppercase tracking-widest">
              Menu
            </p>
          </div>
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="px-4">
              <NavMain items={navData} />
            </div>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="px-3 py-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent hover:bg-sidebar-accent/50 px-4 rounded-lg h-12 transition-colors data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="rounded-lg w-10 h-10 shrink-0">
                      <AvatarImage
                        src={userAvatar || "/placeholder.svg"}
                        alt={userName}
                      />
                      <AvatarFallback className="rounded-lg">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 grid min-w-0 text-sm text-left leading-relaxed">
                      <span className="font-semibold text-base truncate">
                        {userName}
                      </span>
                      <span className="text-sidebar-foreground/70 text-xs truncate">
                        {userEmail}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
