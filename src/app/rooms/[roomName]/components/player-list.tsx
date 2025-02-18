"use client";
import {
  useOthersMapped,
  useSelf,
  useStorage,
} from "@liveblocks/react/suspense";
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

  const playerStates = useStorage((root) => root.playerStates);
  const user = playerStates?.get(self.id);

  const allPlayers = useMemo(
    () => [
      {
        id: self?.id,
        username: self?.username ?? "asd",
        score: playerStates?.get(self.id)?.pairsCount ?? 0,
        isCurrentTurn: true,
        isWinner: true,
        color: "red",
        isInGame: false,
      },
      ...others.map(([_, { username, id }]) => ({
        id,
        username: username,
        score: playerStates?.get(id)?.pairsCount ?? 0,
        isCurrentTurn: false,
        isWinner: true,
        color: "blue",
        isInGame: true,
      })),
    ],
    [self?.id, self?.username, playerStates, others],
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
