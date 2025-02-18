import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { useBroadcastEvent, useMutation } from "@liveblocks/react/suspense";
import { ROOM_EVENTS, type PlayerScore } from "liveblocks.config";
import { startGame as actionStartGame } from "~/app/actions/room";
import { useRoomDetail } from "./room-detail";
import { GAME_STATES } from "../lib/contants";

export function useStartGame() {
  const broadcast = useBroadcastEvent();
  const { setShowCountdown, roomData } = useRoomDetail();

  const startGame = useMutation(
    async ({ storage, self, others }) => {
      if (storage.get("state") === GAME_STATES.IN_PROGRESS) {
        return;
      }
      // Generate fresh shuffled cards
      const gameCards = await actionStartGame(roomData.name);
      if (!gameCards) return;

      const allPlayers = [self.id, ...others.map((other) => other.id)];
      const randomPlayerIndex = Math.floor(Math.random() * allPlayers.length);

      storage.set("state", GAME_STATES.IN_PROGRESS);

      storage.set("currentTurnPlayerId", allPlayers[randomPlayerIndex] ?? null);
      storage.set("firstSelectedId", null);
      storage.set("secondSelectedId", null);
      storage.set("canSelect", true);

      const playerStates = new LiveMap<string, LiveObject<PlayerScore>>();
      allPlayers.forEach((playerId) => {
        playerStates.set(
          playerId,
          new LiveObject<PlayerScore>({
            collectedPairIds: [],
            pairsCount: 0,
          }),
        );
      });

      storage.set("playerStates", playerStates);
      storage.set(
        "gameCards",
        new LiveList(gameCards.map((card) => new LiveObject(card))),
      );

      // Start countdown
      setShowCountdown(true);
      broadcast({ type: ROOM_EVENTS.GAME_STARTING });
    },
    [broadcast, setShowCountdown],
  );

  return startGame;
}
