import { createFileRoute } from "@tanstack/react-router";
import { Feed } from "@/components/screens/feed";

export const Route = createFileRoute("/_app/")({ component: Feed });
