"use client";

import * as React from "react";

import { ChevronRight, LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type NavItem = {
  label?: string;
  isSection?: boolean;
  title?: string;
  url: string;
  icon?: LucideIcon;
  href?: string;
  children?: NavItem[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const [activeParent, setActiveParent] = React.useState<string | null>(
    items.find((i) => !i.isSection)?.title || null,
  );
  const [activeChild, setActiveChild] = React.useState<string | null>(null);

  return (
    <>
      {items.map((item, index) => (
        <div className="py-3" key={index}>
          <NavMainItem
            key={item.title || item.label || index}
            item={item}
            activeParent={activeParent}
            setActiveParent={setActiveParent}
            activeChild={activeChild}
            setActiveChild={setActiveChild}
          />
        </div>
      ))}
    </>
  );
}

function NavMainItem({
  item,
  activeParent,
  setActiveParent,
  setActiveChild,
}: {
  item: NavItem;
  activeParent: string | null;
  activeChild: string | null;
  setActiveParent: (val: string) => void;
  setActiveChild: (val: string | null) => void;
}) {
  const hasChildren = !!item.children?.length;
  const isParentActive = activeParent === item.title;
  const [isOpen, setIsOpen] = React.useState(isParentActive);
  const router = useRouter();

  React.useEffect(() => {
    if (isParentActive) {
      setIsOpen(true);
    }
  }, [isParentActive]);

  if (item.isSection && item.label) {
    return (
      <SidebarGroup className="p-0 pt-5 first:pt-0">
        <SidebarGroupLabel className="p-0 font-medium text-sidebar-foreground text-xs uppercase">
          {item.label}
        </SidebarGroupLabel>
      </SidebarGroup>
    );
  }

  if (hasChildren && item.title) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <SidebarMenuItem>
              <CollapsibleTrigger className="w-full">
                <SidebarMenuButton
                  id={`nav-main-trigger-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  isActive={isParentActive}
                  onClick={() => setActiveParent(item.title!)}
                  className={cn(
                    "px-3 py-5 rounded-md h-9 font-medium text-sm transition-colors cursor-pointer",
                    isParentActive
                      ? "bg-primary! text-primary-foreground!"
                      : "",
                  )}
                >
                  {item.icon && <item.icon size={16} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (item.title) {
    return (
      <SidebarGroup className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              id={`nav-main-button-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              isActive={isParentActive}
              onClick={() => {
                setActiveParent(item.title!);
                setActiveChild(null);
                router.push(item.url);
              }}
              className={cn(
                "px-3 py-2 rounded-md h-9 font-medium text-sm transition-colors cursor-pointer",
                isParentActive ? "bg-primary! text-primary-foreground!" : "",
              )}
            >
              {item.icon && <item.icon />}
              {item.title}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return null;
}

function NavMainSubItem({
  item,
  activeParent,
  setActiveParent,
  activeChild,
  setActiveChild,
  parentTitle,
}: {
  item: NavItem;
  activeParent: string | null;
  activeChild: string | null;
  setActiveParent: (val: string) => void;
  setActiveChild: (val: string | null) => void;
  parentTitle?: string;
}) {
  const hasChildren = !!item.children?.length;
  const [isOpen, setIsOpen] = React.useState(false);

  if (hasChildren && item.title) {
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <SidebarMenuSubButton
              id={`nav-sub-trigger-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-2 rounded-md h-9 font-medium text-sm"
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight
                className={cn(
                  "ml-auto transition-transform duration-200",
                  isOpen && "rotate-90",
                )}
              />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="me-0 pe-0">
              {item.children!.map((child, index) => (
                <NavMainSubItem
                  key={child.title || index}
                  item={child}
                  activeParent={activeParent}
                  setActiveParent={setActiveParent}
                  activeChild={activeChild}
                  setActiveChild={setActiveChild}
                  parentTitle={parentTitle}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    );
  }

  if (item.title) {
    return (
      <SidebarMenuSubItem className="w-full">
        <SidebarMenuSubButton
          id={`nav-sub-button-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "rounded-md w-full transition-colors",
            activeChild === item.title ? "bg-muted! text-foreground!" : "",
          )}
          isActive={activeChild === item.title}
          onClick={() => {
            setActiveParent(parentTitle || "");
            setActiveChild(item.title!);
          }}
        >
          {item.title}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return null;
}
