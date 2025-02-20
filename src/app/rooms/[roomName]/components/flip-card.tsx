import { useStorage } from "@liveblocks/react";
import { useSelf } from "@liveblocks/react/suspense";
import type { ComponentProps } from "react";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type FlipCardProps = ComponentProps<"button"> & {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
};

export function FlipCard({
  front,
  back,
  className,
  isFlipped,
  ...props
}: FlipCardProps) {
  const currentPlayerId = useStorage((root) => root.currentTurnPlayerId);
  const me = useSelf((self) => self.id);

  return (
    <button
      className={cn(
        "aspect-square rounded-xl perspective-1000",
        className,
        currentPlayerId === me ? "cursor-pointer" : "cursor-not-allowed",
      )}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 ease-in-out transform-style-preserve-3d",
          {
            "rotate-y-180": isFlipped,
          },
        )}
      >
        <div className="absolute h-full w-full backface-hidden">
          <Card className="flex h-full w-full items-center justify-center bg-[#58acf4]">
            {front}
          </Card>
        </div>

        <div className="absolute h-full w-full backface-hidden rotate-y-180">
          <Card className="flex h-full w-full items-center justify-center bg-[#58acf4]">
            {back}
          </Card>
        </div>
      </div>
    </button>
  );
}
