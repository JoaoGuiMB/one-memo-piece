import { checkIfUserHasRoom } from "./actions/room";
import { LoginPage } from "./LoginPage";

export default async function HomePage() {
  await checkIfUserHasRoom();

  return <LoginPage />;
}
