import { type PlayerStates } from "liveblocks.config";

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
