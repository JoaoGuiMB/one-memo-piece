import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useRoomDetail } from "../hooks/room-detail";

import Link from "next/link";
import { useStartGame } from "../hooks/start-game";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { joinRoomAction } from "~/app/actions/room";

type RoomHeaderProps = {
  actions?: React.ReactNode; // For flexible right-side actions
};

export function RoomHeader({ actions }: RoomHeaderProps) {
  const { roomData } = useRoomDetail();
  const [roomName, setRoomName] = useState(roomData.name);
  const router = useRouter();

  const copyRoomCode = () => {
    void navigator.clipboard.writeText(roomData.name);

    toast("Room code copied to clipboard!");
  };

  const handleJoinOtherRoom = async () => {
    const formData = new FormData();
    formData.set("roomName", roomName);
    await joinRoomAction(formData);
  };

  return (
    <div className="flex items-center justify-between text-white">
      <h1 className="font-ninja text-2xl">{roomData.name}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-32"
          />
          <Button
            className="text-black"
            variant="outline"
            size="icon"
            onClick={copyRoomCode}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleJoinOtherRoom}>Join other room</Button>
        {actions}
      </div>
    </div>
  );
}

export function OwnerHeader() {
  const startGame = useStartGame();

  return (
    <RoomHeader actions={<Button onClick={startGame}>Restart Game</Button>} />
  );
}

export function PlayerHeader() {
  const { roomData } = useRoomDetail();

  return (
    <RoomHeader
      actions={
        <>
          <Button asChild>
            <Link href={roomData.name}>Join Room</Link>
          </Button>
        </>
      }
    />
  );
}
