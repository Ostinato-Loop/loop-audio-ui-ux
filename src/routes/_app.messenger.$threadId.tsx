import { createFileRoute } from "@tanstack/react-router";
import { ChatThread } from "@/components/screens/chat-thread";
export const Route = createFileRoute("/_app/messenger/$threadId")({ component: ChatThread });
