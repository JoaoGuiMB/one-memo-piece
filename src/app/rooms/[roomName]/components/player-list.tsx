"use client";
import { useOthersMapped, useSelf } from "@liveblocks/react";
import { ScrollArea } from "~/components/ui/scroll-area";

import { PlayerCard } from "./player-card";
import { useMemo } from "react";

export function PlayerList() {
  const self = useSelf((me) => ({
    id: me.id,
    username: me.info.username,
    matchCardsCounter: me.info?.matchCardsCounter,
    connectionId: me.connectionId,
  }));

  const others = useOthersMapped((other) => ({
    username: other.info.username,
    id: other.id,
    matchCardsCounter: other.info?.matchCardsCounter,
  }));

  const allPlayers = useMemo(
    () => [
      {
        id: self?.id ?? "asdoaksdpsodk",
        username: self?.username ?? "asd",
        score: self?.matchCardsCounter ?? 0,
        isCurrentTurn: true,
        isWinner: true,
        color: "red",
        isInGame: false,
      },
      ...others.map(([_, { username, id, matchCardsCounter }]) => ({
        id,
        username: username,
        score: matchCardsCounter ?? 0,
        isCurrentTurn: false,
        isWinner: true,
        color: "blue",
        isInGame: true,
      })),
    ],
    [self, others],
  );

  return (
    <ScrollArea className="h-[600px] max-h-full rounded-lg border p-4">
      <div className="flex flex-col gap-4">
        {allPlayers.map((player) => (
          <PlayerCard key={player.id} {...player} />
        ))}
      </div>
    </ScrollArea>
  );
}
