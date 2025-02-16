"use client";

import { type ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { LiveList } from "@liveblocks/client";
import { useRoomDetail } from "./hooks/room-detail";

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
  console.log(roomData);

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomData.name}
        initialStorage={{ gameCards: new LiveList(roomData.cards) }}
      >
        <ClientSideSuspense fallback={<RoomSkeleton />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
