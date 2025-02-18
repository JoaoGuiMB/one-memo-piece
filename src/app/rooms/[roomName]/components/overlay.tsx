import { useOthers, useStorage } from "@liveblocks/react/suspense";
import { Button } from "~/components/ui/button";

import { useStartGame } from "../hooks/start-game";
import { GAME_STATES, MINIMUM_PLAYERS_TO_START } from "../lib/contants";

function Overlay({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 flex justify-center bg-[#91bcf2]/70">
      <div className="fixed top-[35%] flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {actions}
      </div>
    </div>
  );
}

export function PlayerOverlay() {
  const gameState = useStorage((root) => root.state);

  if (gameState === GAME_STATES.LOBBY) {
    return (
      <Overlay
        title="Waiting for players..."
        description="Waiting for owner to start the game"
      />
    );
  }

  if (gameState === GAME_STATES.FINISHED) {
    return (
      <Overlay title="Game Over!" description={`test won with oi pairs!`} />
    );
  }

  return null;
}

export function OwnerOverlay() {
  const otherPlayers = useOthers((others) => others.length);
  const totalPlayers = otherPlayers + 1;
  const isStartButtonDisabled = totalPlayers < MINIMUM_PLAYERS_TO_START;

  const gameState = useStorage((root) => root.state);

  const startGame = useStartGame();

  if (gameState === GAME_STATES.LOBBY) {
    return (
      <Overlay
        title="Waiting for players..."
        description="Minimum 2 players required to start"
        actions={
          <Button disabled={isStartButtonDisabled} onClick={startGame}>
            Start Game
          </Button>
        }
      />
    );
  }

  if (gameState === GAME_STATES.FINISHED) {
    return (
      <Overlay
        title="Game Over!"
        description={` won with  pairs!`}
        actions={
          <Button disabled={isStartButtonDisabled} onClick={startGame}>
            Start New Game
          </Button>
        }
      />
    );
  }

  return null;
}
