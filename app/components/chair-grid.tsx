"use client";

import { useEffect, useState } from "react";
import { GameState } from "@/types/game";
import { processTurn } from "@/utils/game-logic";

interface Props {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function ChairGrid({ state, setState }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleClick = (chairNumber: number) => {
    if (state.usedChairs.includes(chairNumber) || state.winner) return;

    const { updatedState } = processTurn(state, chairNumber);
    setState(updatedState);
  };

  const chairsClockwise = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className='relative w-72 h-72 mx-auto my-6'>
      {chairsClockwise.map((num, index) => {
        const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
        const radius = 130;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isUsed = state.usedChairs.includes(num);
        const isInactive = isUsed || state.winner !== null;

        return (
          <button
            key={num}
            onClick={() => handleClick(num)}
            disabled={isInactive}
            className={`absolute w-12 aspect-square rounded-md font-bold transition duration-200
              ${
                isInactive
                  ? "bg-[#1a1a1a] border border-dashed border-white text-transparent cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-100 cursor-pointer"
              }
            `}
            style={{
              left: `calc(50% + ${x}px - 1.5rem)`,
              top: `calc(50% + ${y}px - 1.5rem)`,
            }}
          >
            {isInactive ? "" : num}
          </button>
        );
      })}
    </div>
  );
}
