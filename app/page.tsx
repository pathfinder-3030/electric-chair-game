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
    player1: {
      score: 0,
      shocks: 0,
      chosenChairs: [],
      roundScores: Array(8).fill(null),
    },
    player2: {
      score: 0,
      shocks: 0,
      chosenChairs: [],
      roundScores: Array(8).fill(null),
    },
    usedChairs: [],
    chairWithElectricity: null,
    statusMessage: "表の攻撃：プレイヤー1が椅子を選んでください。",
  });

  return (
    <div className='min-h-screen  '>
      <div className='w-full max-w-xl p-6'>
        <h1 className='text-3xl font-bold mb-6 text-center text-co text-white'>
          ⚡ 電気イスゲーム ⚡
        </h1>

        <ChairGrid state={gameState} setState={setGameState} />

        <GameControls state={gameState} setState={setGameState} />

        <p className='mt-4 p-3 bg-gray-800 rounded text-sm text-center text-white'>
          {gameState.statusMessage}
        </p>
        <ScoreBoard state={gameState} />
      </div>
    </div>
  );
}
