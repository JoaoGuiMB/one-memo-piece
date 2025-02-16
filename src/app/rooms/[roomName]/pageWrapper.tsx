"use client";
import Game from "./components/game";
import { Room } from "./Room";

import { type RoomData, RoomDetailProvider } from "./hooks/room-detail";

export default function RoomPageWrapper({
  params,
}: {
  params: { roomInfo: RoomData };
}) {
  return (
    <RoomDetailProvider roomData={params.roomInfo}>
      <Room>
        <Game />
      </Room>
    </RoomDetailProvider>
  );
}
