import { useStorage } from "@liveblocks/react/suspense";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRoomDetail } from "../hooks/room-detail";
import { GAME_STATES } from "../lib/contants";
import Link from "next/link";

type RoomHeaderProps = {
  actions?: React.ReactNode; // For flexible right-side actions
};

export function RoomHeader({ actions }: RoomHeaderProps) {
  const { roomData } = useRoomDetail();

  const copyRoomCode = () => {
    void navigator.clipboard.writeText(roomData.name);

    toast("Room code copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-ninja text-2xl">{roomData.name}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Input value={roomData.name} readOnly className="w-32" />
          <Button variant="outline" size="icon" onClick={copyRoomCode}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        {actions}
      </div>
    </div>
  );
}

export function OwnerHeader() {
  const { roomData } = useRoomDetail();
  const gameState = useStorage((root) => root.state);

  return (
    <RoomHeader
      actions={
        gameState === GAME_STATES.IN_PROGRESS ? (
          <div className="flex gap-4">
            <Button variant="outline" disabled>
              Go to room
            </Button>
          </div>
        ) : (
          <Button variant="outline" asChild>
            <Link href={roomData.name}>Go to room</Link>
          </Button>
        )
      }
    />
  );
}

export function PlayerHeader() {
  const { roomData } = useRoomDetail();

  return (
    <RoomHeader
      actions={
        <Button variant="destructive" asChild>
          <Link href={roomData.name}>Leave Room</Link>
        </Button>
      }
    />
  );
}
