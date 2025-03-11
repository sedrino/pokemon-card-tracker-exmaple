import { createFileRoute, linkOptions, Outlet } from "@tanstack/react-router";
import { SquareTerminal } from "lucide-react";

import { NavSection } from "@/components/nav/nav-main";
import { DefaultSidebar } from "@/components/sidebars/default-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const navSections: NavSection[] = [
  {
    title: "Playground",
    items: [
      {
        title: "Test",
        icon: SquareTerminal,
        link: linkOptions({ to: "/test" }),
        items: [
          {
            title: "Test 2",
            link: linkOptions({ to: "/dev/pages" }),
          },
        ],
      },
    ],
  },
];
export const Route = createFileRoute("/(core)/_auth/_layout-default")({
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
