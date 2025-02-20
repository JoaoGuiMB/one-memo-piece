import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type PlayerCardProps = {
  username: string;
  score: number;
  isCurrentTurn: boolean;
  isWinner: boolean;

  isInGame: boolean;
};

export function PlayerCard({
  username,
  score,
  isCurrentTurn,
  isWinner,
  isInGame,
}: PlayerCardProps) {
  const initials = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      className={cn("flex items-center gap-4 bg-[#2E63A4] p-4", {
        "bg-[#105edd]": isCurrentTurn,
        "opacity-30": !isInGame,
      })}
    >
      <Avatar className="ring-2 ring-green-500">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="text-white">
        <p className="font-ninja text-sm">{username}</p>
        <p className="text-sm">Pairs: {score}</p>
      </div>

      {isWinner && <Trophy className="ml-auto size-8 text-yellow-500" />}
    </Card>
  );
}
