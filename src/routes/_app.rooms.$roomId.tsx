import { createFileRoute } from "@tanstack/react-router";
import { RoomDetail } from "@/components/screens/room-detail";
export const Route = createFileRoute("/_app/rooms/$roomId")({ component: RoomDetail });
