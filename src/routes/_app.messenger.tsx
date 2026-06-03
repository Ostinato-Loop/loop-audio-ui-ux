import { createFileRoute } from "@tanstack/react-router";
import { Messenger } from "@/components/screens/messenger";
export const Route = createFileRoute("/_app/messenger")({ component: Messenger });
