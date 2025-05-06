"use client";

import { GameState } from "@/types/game";

interface Props {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default function GameControls({ state, setState }: Props) {
  const handleEndTurn = () => {
    setState((prev) => ({
      ...prev,
      currentTurn: prev.currentTurn === "Player1" ? "Player2" : "Player1",
      statusMessage: `${prev.phase}：${
        prev.currentTurn === "Player1" ? "プレイヤー2" : "プレイヤー1"
      }のターンです。`,
    }));
  };

  return (
    <button
      onClick={handleEndTurn}
      style={{
        marginTop: "1rem",
        padding: "8px 16px",
        fontWeight: "bold",
        backgroundColor: "#8df",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {state.currentTurn} 選択終了（次へ）
    </button>
  );
}
