import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { getRoomInfoUseCase } from "~/server/use-cases/getRoomInfoUseCase";

import RoomPageWrapper from "./pageWrapper";

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

  const roomInfo = await getRoomInfoUseCase(roomName);

  return <RoomPageWrapper params={{ roomInfo }} />;
}
