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

  const currentTurnId = useStorage((root) => root.currentTurnPlayerId);
  const winningPlayerId = useStorage((root) => root.winningPlayerId);

  const allPlayers = useMemo(
    () => [
      {
        id: self?.id,
        username: self?.username ?? "asd",
        score: playerStates?.get(self.id)?.pairsCount ?? 0,
        isCurrentTurn: Boolean(currentTurnId && currentTurnId === self.id),
        isWinner: Boolean(winningPlayerId && winningPlayerId === self.id),
        color: "red",
        isInGame: true,
      },
      ...others.map(([_, { username, id }]) => ({
        id,
        username: username,
        score: playerStates?.get(id)?.pairsCount ?? 0,
        isCurrentTurn: Boolean(currentTurnId && currentTurnId === id),
        isWinner: Boolean(winningPlayerId && winningPlayerId === id),
        color: "blue",
        isInGame: true,
      })),
    ],
    [
      self.id,
      self?.username,
      playerStates,
      currentTurnId,
      winningPlayerId,
      others,
    ],
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
