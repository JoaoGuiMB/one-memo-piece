import Game from "./components/game";
import { Room } from "./Room";

// Mark this component as a Client Component

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const { roomName } = await params;
  return (
    <Room roomName={roomName}>
      <Game />
    </Room>
  );
}
