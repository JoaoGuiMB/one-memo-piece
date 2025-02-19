"use client";

import { type ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { useRoomDetail } from "./hooks/room-detail";
import { type PlayerScore } from "liveblocks.config";
import { GAME_STATES } from "./lib/contants";

function RoomSkeleton() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center bg-[#2E63A4]">
      <Image
        src={"/logo.webp"}
        width={150}
        height={100}
        alt="logo"
        className="mb-4"
      />
    </div>
  );
}

export function Room({ children }: { children: ReactNode }) {
  const { roomData } = useRoomDetail();

  const playerStates = new LiveMap<string, LiveObject<PlayerScore>>();
  playerStates.set(
    roomData.ownerId,
    new LiveObject<PlayerScore>({
      collectedPairIds: [],
      pairsCount: 0,
    }),
  );

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomData.name}
        initialStorage={{
          winningPlayerId: null,
          animatingErrorIds: [],
          animatingMatchIds: [],
          state: GAME_STATES.LOBBY,
          gameCards: new LiveList(
            roomData.cards.map((card) => new LiveObject(card)),
          ),
          playerStates,
          currentTurnPlayerId: roomData.ownerId, // Change later, add currentPlayerId to database
          firstSelectedId: null,
          secondSelectedId: null,
          canSelect: true,
        }}
      >
        <ClientSideSuspense fallback={<RoomSkeleton />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
