// Define Liveblocks types for your application

import {
  type LiveObject,
  type LiveList,
  type LiveMap,
} from "@liveblocks/client";
import { type GameCard } from "~/app/rooms/[roomName]/lib/generateCards";

export type PlayerScore = {
  collectedPairIds: Array<number>;
  pairsCount: number;
};

export type PlayerStates = LiveMap<string, LiveObject<PlayerScore>>;

export const ROOM_EVENTS = {
  GAME_STARTING: "GAME_STARTING",
  GAME_FINISHED: "GAME_FINISHED",
  MATCH_SOUND: "MATCH_SOUND",
  ERROR_SOUND: "ERROR_SOUND",
} as const;

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      state: "LOBBY" | "IN_PROGRESS" | "FINISHED";
      // Example, a conflict-free list
      // animals: LiveList<string>;
      gameCards: LiveList<LiveObject<GameCard>>;
      playerStates: PlayerStates;
      currentTurnPlayerId: string | null;

      firstSelectedId: string | null;
      secondSelectedId: string | null;
      canSelect: boolean;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        // name: string;
        // avatar: string;
        matchCardsCounter: number;
        username: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent:
      | { type: typeof ROOM_EVENTS.GAME_STARTING }
      | { type: typeof ROOM_EVENTS.GAME_FINISHED }
      | { type: typeof ROOM_EVENTS.MATCH_SOUND }
      | { type: typeof ROOM_EVENTS.ERROR_SOUND };
    // Example has two events, using a union
    // | { type: "PLAY" }
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}

export {};
