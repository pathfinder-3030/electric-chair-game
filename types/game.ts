export type Phase = "表の攻撃" | "裏の攻撃";

export interface PlayerState {
  score: number; // 現在のポイント
  shocks: number; // 電撃を受けた回数
  chosenChairs: number[]; // これまでに選んだ椅子
}

export interface GameState {
  phase: Phase; // 現在のフェーズ（表 or 裏）
  round: number; // 現在のラウンド（1〜8）
  currentTurn: "Player1" | "Player2"; // 現在のプレイヤー
  player1: PlayerState; // プレイヤー1の状態
  player2: PlayerState; // プレイヤー2の状態
  usedChairs: number[]; // 使用済みの椅子
  chairWithElectricity: number | null; // 電流を流した椅子の番号（nullなら未選択）
  statusMessage: string; // 現在のステータスメッセージ
}
