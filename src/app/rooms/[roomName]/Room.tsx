"use client";

import { type ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

function RoomSkeleton() {
  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center">
      <img
        src={"/public/straw-hat-logo.png"}
        alt="Loading..."
        className="animate-heartbeat mb-40 w-[300px]"
      />
    </div>
  );
}

export function Room({
  children,
  roomName,
}: {
  children: ReactNode;
  roomName: string;
}) {
  console.log(roomName);
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_VkwZvOGsFix97nZijfdJEbYpK0ScdDzoqUsXxwD40-_nwGUOzC7Xic9VS_2mFLbv"
      }
    >
      <RoomProvider id={roomName}>
        <ClientSideSuspense fallback={<RoomSkeleton />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
