import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app=sidebar";
import { Separator } from "@base-ui/react";
import { requireAuth } from "@/module/auth/utils/auth-utils";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 px-4 border-b h-16 shrink-0">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <h1 className="font-semibold text-foreground text-xl">Dashboard</h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
