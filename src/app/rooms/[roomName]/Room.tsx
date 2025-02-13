"use client";

import { type ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Image from "next/image";
import { LiveList } from "@liveblocks/client";
import { type GameCard } from "./lib/generateCards";

function RoomSkeleton() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center bg-[#2E63A4]">
      <Image
        src={"/straw-hat-logo.png"}
        width={300}
        height={300}
        alt="Loading..."
        className="mb-40 w-[300px] animate-heartbeat"
      />
    </div>
  );
}

export function Room({
  children,
  roomName,
  cards,
}: {
  children: ReactNode;
  roomName: string;
  cards: GameCard[];
}) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_VkwZvOGsFix97nZijfdJEbYpK0ScdDzoqUsXxwD40-_nwGUOzC7Xic9VS_2mFLbv"
      }
    >
      <RoomProvider
        id={roomName}
        initialStorage={{ gameCards: new LiveList(cards) }}
      >
        <ClientSideSuspense fallback={<RoomSkeleton />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
