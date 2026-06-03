import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@/components/screens/profile";
export const Route = createFileRoute("/_app/profile")({ component: Profile });
