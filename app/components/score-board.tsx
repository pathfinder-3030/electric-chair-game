"use client";

import { GameState } from "@/types/game";

interface Props {
  state: GameState;
}

export default function ScoreBoard({ state }: Props) {
  const { player1, player2, round, phase } = state;

  // 1〜8ラウンド分の列＋合計列
  const maxRounds = 8;
  const roundHeaders = Array.from({ length: maxRounds }, (_, i) => `R${i + 1}`);

  return (
    <div className='mb-4 overflow-x-auto'>
      <p className='mb-2 text-sm'>
        🌀 フェーズ: {phase} / 🔁 ラウンド: {round}
      </p>

      <table className='table-auto border-collapse w-full text-sm'>
        <thead>
          <tr>
            <th className='border px-2 py-1 bg-gray-800'>Player</th>
            {roundHeaders.map((label) => (
              <th key={label} className='border px-2 py-1 bg-gray-800 text-center'>
                {label}
              </th>
            ))}
            <th className='border px-2 py-1 bg-gray-800 text-center'>合計</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-2 py-1 text-center font-bold'>Player 1</td>
            {Array.from({ length: maxRounds }, (_, i) => (
              <td key={i} className='border px-2 py-1 text-center'>
                {player1.roundScores?.[i] ?? "-"}
              </td>
            ))}
            <td className='border px-2 py-1 text-center font-bold'>
              {player1.score} ⚡{player1.shocks}
            </td>
          </tr>
          <tr>
            <td className='border px-2 py-1 text-center font-bold'>Player 2</td>
            {Array.from({ length: maxRounds }, (_, i) => (
              <td key={i} className='border px-2 py-1 text-center'>
                {player2.roundScores?.[i] ?? "-"}
              </td>
            ))}
            <td className='border px-2 py-1 text-center font-bold'>
              {player2.score} ⚡{player2.shocks}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
