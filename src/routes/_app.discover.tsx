import { createFileRoute } from "@tanstack/react-router";
import { Discover } from "@/components/screens/discover";
export const Route = createFileRoute("/_app/discover")({ component: Discover });
