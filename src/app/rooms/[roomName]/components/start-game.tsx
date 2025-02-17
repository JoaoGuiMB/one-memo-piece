"use client";

import { Button } from "~/components/ui/button";
import { startGame } from "~/app/actions/room";
import { useMutation } from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";

export default function StartGameButton({ roomName }: { roomName: string }) {
  const handleStartGame = useMutation(async ({ storage, self }) => {
    const generatedCards = (await startGame(roomName)) ?? [];
    storage.set(
      "gameCards",
      new LiveList(generatedCards.map((card) => new LiveObject(card))),
    );
  }, []);

  return <Button onClick={() => handleStartGame()}>Start Game</Button>;
}
