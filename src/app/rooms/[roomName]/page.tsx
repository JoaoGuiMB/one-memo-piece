import { auth } from "@clerk/nextjs/server";
import Game from "./components/game";
import { Room } from "./Room";

import { redirect } from "next/navigation";

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

  return (
    <Room roomName={roomName}>
      <Game />
    </Room>
  );
}
