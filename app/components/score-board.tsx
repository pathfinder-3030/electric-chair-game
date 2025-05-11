"use client";

import { GameState } from "@/types/game";

interface Props {
  state: GameState;
}

export default function ScoreBoard({ state }: Props) {
  const { player1, player2 } = state;

  const maxRounds = 8;
  const roundHeaders = Array.from({ length: maxRounds }, (_, i) => `R${i + 1}`);

  return (
    <div className='mt-5 overflow-x-auto'>
      <table className='table-auto border-collapse w-full text-sm'>
        <thead>
          <tr>
            <th className='border border-black px-2 py-1 bg-gray-500 text-white' />
            {roundHeaders.map((label) => (
              <th
                key={label}
                className='border border-black px-2 py-1 bg-gray-500 text-center text-white'
              >
                {label}
              </th>
            ))}
            <th className='border border-black px-2 py-1 bg-gray-500 text-center text-white'>
              合計
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border px-2 py-1 text-center font-bold bg-yellow-500'>Player 1</td>
            {Array.from({ length: maxRounds }, (_, i) => (
              <td key={i} className='border px-2 py-1 text-center bg-white'>
                {player1.roundScores?.[i] === 0 ? "⚡" : player1.roundScores?.[i] ?? "-"}
              </td>
            ))}
            <td className='border px-2 py-1 text-center font-bold bg-white'>{player1.score}</td>
          </tr>
          <tr>
            <td className='border px-2 py-1 text-center font-bold bg-yellow-500'>Player 2</td>
            {Array.from({ length: maxRounds }, (_, i) => (
              <td key={i} className='border px-2 py-1 text-center bg-white'>
                {player2.roundScores?.[i] === 0 ? "⚡" : player2.roundScores?.[i] ?? "-"}
              </td>
            ))}
            <td className='border px-2 py-1 text-center font-bold bg-white'>{player2.score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
