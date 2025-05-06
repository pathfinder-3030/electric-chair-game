"use client";

import { useState } from "react";

import { GameState } from "@/types/game";
import ScoreBoard from "./components/score-board";
import ChairGrid from "./components/chair-grid";
import GameControls from "./components/game-controls";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    phase: "表の攻撃",
    round: 1,
    currentTurn: "Player1",
    player1: { score: 0, shocks: 0, chosenChairs: [] },
    player2: { score: 0, shocks: 0, chosenChairs: [] },
    usedChairs: [],
    chairWithElectricity: null,
    statusMessage: "表の攻撃：プレイヤー1が椅子を選んでください。",
  });

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚡ 電気いすゲーム ⚡</h1>

      <ScoreBoard state={gameState} />

      <ChairGrid state={gameState} setState={setGameState} />

      <GameControls state={gameState} setState={setGameState} />

      <p
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          backgroundColor: "#eee",
          borderRadius: "4px",
        }}
      >
        {gameState.statusMessage}
      </p>
    </main>
  );
}
