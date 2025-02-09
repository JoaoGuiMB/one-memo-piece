import { ScrollArea } from "~/components/ui/scroll-area";

import { PlayerCard } from "./player-card";

export function PlayerList() {
  const allPlayers = [
    {
      id: "1",
      username: "Luffy",
      score: 5,
      isCurrentTurn: true,
      isWinner: false,
      color: "red",
      isInGame: true,
    },
    {
      id: "2",
      username: "Zoro",
      score: 3,
      isCurrentTurn: false,
      isWinner: false,
      color: "blue",
      isInGame: true,
    },
  ];

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
