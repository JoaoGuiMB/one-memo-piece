import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { findRoomById, findRoomByUserId } from "~/server/db/rooms/queries";
import { env } from "~/env";

const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SERVER_KEY,
});

export async function POST(request: Request) {
  // Get the current user from your database
  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  // Start an auth session inside your endpoint
  console.log(user.username);

  const foundRoomUser = await findRoomByUserId(user.id);
  if (!foundRoomUser[0]?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const foundRoom = await findRoomById(foundRoomUser[0]?.id);
  if (!foundRoom[0]?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  console.log(foundRoomUser[0]?.matchedCounter);
  const session = liveblocks.prepareSession(
    user.id,
    {
      userInfo: {
        matchCardsCounter: foundRoomUser[0]?.matchedCounter ?? 0,
        username: user.username ?? "asd",
      },
    }, // Optional
  );
  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  session.allow(foundRoom[0]?.name, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
