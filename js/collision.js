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
 * ※ matrix 값이 0인 칸은 블록이 없는 영역으로 간주한다.
 * ※ y < 0 (보드 위쪽 영역)은 충돌로 간주하지 않는다.
 *
 * @param {Object} tetromino
 * @param {number[][]} tetromino.matrix - 테트로미노 형태 (2차원 배열)
 * @param {number} tetromino.x - 보드 기준 x 좌표
 * @param {number} tetromino.y - 보드 기준 y 좌표
 * @param {number[][]} board - 현재 게임 보드
 * @returns {boolean} 충돌 여부 (true: 충돌 발생)
 */
function hasCollision(tetromino, board) {
  const matrix = tetromino.matrix;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      // 블록이 없는 칸은 검사하지 않음
      if (matrix[y][x] === 0) continue;

      // 테트로미노 로컬 좌표 → 보드 좌표 변환
      const boardX = tetromino.x + x;
      const boardY = tetromino.y + y;

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
  }

  return false;
}
