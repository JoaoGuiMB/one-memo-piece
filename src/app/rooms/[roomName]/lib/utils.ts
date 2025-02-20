import { type LiveObject } from "@liveblocks/client";
import { type PlayerStates } from "liveblocks.config";

export const COLORS = [
  // Red
  "#E57373",
  // Deep Purple
  "#9575CD",
  // Light Blue
  "#4FC3F7",
  // Light Green
  "#81C784",
  // Yellow
  "#FFF176",
  // Deep Orange
  "#FF8A65",
  // Pink
  "#F06292",
  // Indigo
  "#7986CB",
  // Teal
  "#009688",
  // Amber
  "#FFC107",
  // Blue Grey
  "#607D8B",
  // Cyan
  "#00BCD4",
  // Lime
  "#CDDC39",
  // Purple
  "#9C27B0",
  // Orange
  "#FF9800",
] as const;

export function getColorByConnectionId(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}

export function getNextPlayerId({
  currentId,
  playerStates,
}: {
  currentId: string;
  playerStates: PlayerStates;
}) {
  // Get ordered list of players from storage
  const playerIds = Array.from(playerStates.keys());

  const currentIndex = playerIds.indexOf(currentId);
  const nextIndex = (currentIndex + 1) % playerIds.length;

  return playerIds[nextIndex];
}

export function determineWinner({
  storage,
}: {
  storage: LiveObject<{ playerStates: PlayerStates }>;
}) {
  const playerStates = storage.get("playerStates");
  let maxPairs = 0;
  let winners: Array<string> = [];

  playerStates.forEach((state, playerId) => {
    const pairs = state.get("pairsCount");
    if (pairs > maxPairs) {
      maxPairs = pairs;
      winners = [playerId];
    } else if (pairs === maxPairs) {
      // Handle same score
      winners.push(playerId);
    }
  });

  // If a tie, pick random winner
  // If length is 1, this will just be the winner
  return winners[Math.floor(Math.random() * winners.length)];
}
