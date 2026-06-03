import { createFileRoute } from "@tanstack/react-router";
import { UserProfile } from "@/components/screens/user-profile";
export const Route = createFileRoute("/_app/u/$handle")({ component: UserProfile });
