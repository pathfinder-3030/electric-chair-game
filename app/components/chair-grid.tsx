"use client";

import { GameState } from "@/types/game";
import { processTurn } from "@/utils/game-logic";

interface Props {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function ChairGrid({ state, setState }: Props) {
  const handleClick = (chairNumber: number) => {
    if (state.usedChairs.includes(chairNumber)) return;

    const { updatedState } = processTurn(state, chairNumber);
    setState(updatedState);
  };

  return (
    <div className='grid grid-cols-4 gap-3 my-4'>
      {Array.from({ length: 12 }, (_, i) => i + 1)
        .filter((num) => !state.usedChairs.includes(num))
        .map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className='h-20 rounded font-bold bg-pink-300 hover:bg-pink-400 transition'
          >
            {num}
          </button>
        ))}
    </div>
  );
}
