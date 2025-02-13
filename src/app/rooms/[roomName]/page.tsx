import { auth } from "@clerk/nextjs/server";
import Game from "./components/game";
import { Room } from "./Room";

import { redirect } from "next/navigation";
import { findGameCards } from "~/server/db/cards/queries";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const { roomName } = await params;
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const foundCards = (await findGameCards(roomName)) ?? [];

  return (
    <Room roomName={roomName} cards={foundCards}>
      <Game roomName={roomName} />
    </Room>
  );
}
