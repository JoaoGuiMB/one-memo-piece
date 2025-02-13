"use client";

import { Button } from "~/components/ui/button";
import { startGame } from "~/app/actions/room";

export default function StartGameButton({ roomName }: { roomName: string }) {
  return <Button onClick={() => startGame(roomName)}>Start Game</Button>;
}
