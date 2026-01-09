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
 * 주어진 위치에서 테트로미노가 충돌하는지 검사한다.
 * @param {Object} currentTetromino - 현재 테트로미노
 * @param {number[][]} board - 게임 보드
 * @param {number} offsetX - 이동할 X 오프셋
 * @param {number} offsetY - 이동할 Y 오프셋
 * @returns {boolean} 충돌 여부
 */
function hasCollision(currentTetromino, board, offsetX = 0, offsetY = 0) {
  const { matrix, x, y } = currentTetromino;

  // 테트로미노의 모든 셀 검사
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // 빈 칸은 충돌 검사 제외
      if (matrix[row][col] === 0) continue;

      const newX = x + col + offsetX;
      const newY = y + row + offsetY;

      // 좌 / 우 경계 충돌
      if (newX < 0 || newX >= BOARD_COLS) {
        return true;
      }
       
       // 바닥 충돌
      if (newY >= BOARD_ROWS) {
        return true;
      }

       // hidden row 위는 충돌 검사 대상이 아님
      if (newY < HIDDEN_ROWS) {
        continue;
      }

      // 보드 내부 고정 블록 충돌
      if (newY >= 0 && board[newY][newX] !== 0) {
        return true;
      }
    }
  }

  return false;
}
