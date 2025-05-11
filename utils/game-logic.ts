import { GameState } from "@/types/game";

interface ProcessTurnResult {
  updatedState: GameState;
}

/**
 * 現在のフェーズに応じた攻撃処理
 */
export function processTurn(state: GameState, selectedChair: number): ProcessTurnResult {
  const newState = { ...state };

  const { phase, currentTurn, chairWithElectricity, usedChairs } = state;

  // 使用済みチェック
  if (usedChairs.includes(selectedChair)) {
    newState.statusMessage = `椅子 ${selectedChair} はすでに使用されています。`;
    return { updatedState: newState };
  }

  // 勝敗がすでに決まっていれば何もしない
  if (newState.winner) {
    return { updatedState: newState };
  }

  if (phase === "表の攻撃") {
    if (currentTurn === "Player1") {
      newState.chairWithElectricity = selectedChair;
      newState.currentTurn = "Player2";
      newState.statusMessage = `プレイヤー1が電流椅子を選びました。\n次はプレイヤー2が座る椅子を選んでください。`;
    } else if (currentTurn === "Player2") {
      const hit = selectedChair === chairWithElectricity;
      if (hit) {
        newState.player2.shocks += 1;
        if (newState.player2.shocks >= 3) {
          newState.winner = "Player1";
          newState.statusMessage = "⚡ Player 2 が 3 回感電しました！Player 1 の勝利！";
          return { updatedState: newState };
        } else {
          newState.statusMessage = `💥 電撃命中！プレイヤー2が感電しました！`;
        }
      } else {
        newState.player2.score += selectedChair;
        newState.statusMessage = `⚡ セーフ！プレイヤー2は ${selectedChair} 点を獲得！`;
      }

      const updatedScores = [...newState.player2.roundScores];
      updatedScores[newState.round - 1] = hit ? 0 : selectedChair;
      newState.player2.roundScores = updatedScores;

      newState.player2.chosenChairs.push(selectedChair);
      newState.usedChairs.push(selectedChair);
      newState.phase = "裏の攻撃";
      newState.currentTurn = "Player2";
      newState.chairWithElectricity = null;
    }
  } else if (phase === "裏の攻撃") {
    if (currentTurn === "Player2") {
      newState.chairWithElectricity = selectedChair;
      newState.currentTurn = "Player1";
      newState.statusMessage = `プレイヤー2が電流椅子を選びました。\n次はプレイヤー1が座る椅子を選んでください。`;
    } else if (currentTurn === "Player1") {
      const hit = selectedChair === chairWithElectricity;
      if (hit) {
        newState.player1.shocks += 1;
        if (newState.player1.shocks >= 3) {
          newState.winner = "Player2";
          newState.statusMessage = "⚡ Player 1 が 3 回感電しました！Player 2 の勝利！";
          return { updatedState: newState };
        } else {
          newState.statusMessage = `💥 電撃命中！プレイヤー1が感電しました！`;
        }
      } else {
        newState.player1.score += selectedChair;
        newState.statusMessage = `⚡ セーフ！プレイヤー1は ${selectedChair} 点を獲得！`;
      }

      // ラウンドスコア記録
      const updatedScores = [...newState.player1.roundScores];
      updatedScores[newState.round - 1] = hit ? 0 : selectedChair;
      newState.player1.roundScores = updatedScores;

      newState.player1.chosenChairs.push(selectedChair);
      newState.usedChairs.push(selectedChair);

      // 次のラウンドへ
      newState.phase = "表の攻撃";
      newState.currentTurn = "Player1";
      newState.chairWithElectricity = null;
      newState.round += 1;
    }
  }

  return { updatedState: newState };
}
