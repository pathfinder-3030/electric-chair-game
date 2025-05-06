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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 80px)",
        gap: "12px",
        margin: "1rem 0",
      }}
    >
      {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
        const isUsed = state.usedChairs.includes(num);
        return (
          <button
            key={num}
            onClick={() => handleClick(num)}
            disabled={isUsed}
            style={{
              height: "80px",
              background: isUsed ? "#ccc" : "#f8d",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: isUsed ? "not-allowed" : "pointer",
            }}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
