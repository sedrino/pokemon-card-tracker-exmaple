import { createFileRoute, linkOptions, Outlet } from "@tanstack/react-router";
import { CreditCard, LayoutDashboard } from "lucide-react";

import { NavSection } from "@/components/nav/nav-main";
import { DefaultSidebar } from "@/components/sidebars/default-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const navSections: NavSection[] = [
  {
    title: "Main",
    icon: LayoutDashboard,
    items: [
      {
        title: "Dashboard",
        link: linkOptions({ to: "/app" }),
      },
    ],
  },
  {
    title: "Cards",
    icon: CreditCard,
    items: [
      {
        title: "All Cards",
        link: linkOptions({ to: "/app/cards" }),
      },
      {
        title: "New Card",
        link: linkOptions({ to: "/app/cards/new" }),
      },
    ],
  },
];
export const Route = createFileRoute("/_auth/app")({
  component: MainLayout,
});
export default function MainLayout() {
  return (
    <SidebarProvider>
      <DefaultSidebar navSections={navSections} />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
