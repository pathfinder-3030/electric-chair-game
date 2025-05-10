"use client";

import { useEffect, useState } from "react";
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
    winner: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 勝者が決まったらモーダルを開く
  useEffect(() => {
    if (gameState.winner) {
      setIsModalOpen(true);
    }
  }, [gameState.winner]);

  return (
    <div className='min-h-screen relative'>
      <div className='w-full max-w-xl p-6 mx-auto'>
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

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50'>
          <div className='bg-white rounded-xl p-8 text-center shadow-lg max-w-sm w-full'>
            <p className='text-lg font-semibold mb-6'>{gameState.winner} の勝利！</p>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
              onClick={() => setIsModalOpen(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
