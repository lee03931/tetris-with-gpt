/**
 * collision.js
 * -----------------------------
 * 테트리스 충돌 판정 모듈
 * - 벽 충돌
 * - 바닥 충돌
 * - 고정 블록 충돌
 */

/* ===============================
   충돌 판정
   =============================== */

/**
 * 테트로미노가 현재 보드 상태에서 충돌하는지 검사한다.
 *
 * 충돌 조건:
 * 1. 좌 / 우 벽을 벗어나는 경우
 * 2. 바닥을 벗어나는 경우
 * 3. 이미 고정된 블록과 겹치는 경우
 *
 * ※ y < 0 (보드 위쪽 영역)은 충돌로 간주하지 않는다.
 *
 * @param {Object} tetromino
 * @param {{x:number, y:number}[]} tetromino.blocks - 테트로미노의 로컬 블록 좌표
 * @param {number} tetromino.x - 보드 기준 x 좌표
 * @param {number} tetromino.y - 보드 기준 y 좌표
 * @param {number[][]} board - 현재 게임 보드
 * @returns {boolean} 충돌 여부 (true: 충돌 발생)
 */
function hasCollision(tetromino, board) {
  for (const block of tetromino.blocks) {
    // 테트로미노 로컬 좌표 → 보드 좌표 변환
    const boardX = tetromino.x + block.x;
    const boardY = tetromino.y + block.y;

    // 좌 / 우 벽 충돌
    if (boardX < 0 || boardX >= BOARD_COLS) {
      return true;
    }

    // 바닥 충돌
    if (boardY >= BOARD_ROWS) {
      return true;
    }

    // 고정 블록 충돌
    // (보드 위쪽 영역 y < 0 은 검사 대상에서 제외)
    if (boardY >= 0 && board[boardY][boardX] !== 0) {
      return true;
    }
  }

  return false;
}

