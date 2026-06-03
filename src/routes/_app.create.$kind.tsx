import { createFileRoute } from "@tanstack/react-router";
import { CreateScreen } from "@/components/screens/create";
export const Route = createFileRoute("/_app/create/$kind")({ component: CreateScreen });
