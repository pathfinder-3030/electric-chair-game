"use client";

import { GameState } from "@/types/game";

interface Props {
  state: GameState;
}

export default function ScoreBoard({ state }: Props) {
  const { player1, player2, round, phase } = state;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <p>
        🌀 フェーズ: {phase} / 🔁 ラウンド: {round}
      </p>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h3>Player 1</h3>
          <p>スコア: {player1.score}</p>
          <p>電撃回数: {player1.shocks}</p>
        </div>
        <div>
          <h3>Player 2</h3>
          <p>スコア: {player2.score}</p>
          <p>電撃回数: {player2.shocks}</p>
        </div>
      </div>
    </div>
  );
}
