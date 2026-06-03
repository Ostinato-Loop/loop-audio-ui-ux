import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/phone-frame";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <PhoneFrame>
      <main className="flex-1 pb-2"><Outlet /></main>
      <BottomNav />
    </PhoneFrame>
  );
}
