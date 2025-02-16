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
  return (
    <button
      className={cn("perspective-1000 aspect-square rounded-xl", className)}
      {...props}
    >
      <div
        className={cn(
          "transform-style-preserve-3d relative h-full w-full transition-transform duration-500 ease-in-out",
          {
            "rotate-y-180": isFlipped,
          },
        )}
      >
        <div className="backface-hidden absolute h-full w-full">
          <Card className="flex h-full w-full items-center justify-center bg-[#58acf4]">
            {front}
          </Card>
        </div>

        <div className="backface-hidden rotate-y-180 absolute h-full w-full">
          <Card className="flex h-full w-full items-center justify-center bg-[#58acf4]">
            {back}
          </Card>
        </div>
      </div>
    </button>
  );
}
