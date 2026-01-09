/**
 * movement.js
 * -----------------------------
 * 테트로미노 이동 / 회전 로직 전담
 * - 이동 가능 여부 판단
 * - 실제 위치 변경은 여기서만 수행
 */

/* ===============================
   이동 로직
   =============================== */

/**
 * 테트로미노 이동 시도
 * @param {Object} currentTetromino - 현재 테트로미노
 * @param {number} dx - X 이동량
 * @param {number} dy - Y 이동량
 * @param {Array<Array<number>>} board - 게임 보드
 * @returns {boolean} 이동 성공 여부
 */
function tryMove(currentTetromino, board, dx, dy) {

  // 충돌 발생 시 이동 불가
  if (hasCollision(currentTetromino, board, dx, dy)) {
    return false;
  }

  // 이동 확정
  currentTetromino.x += dx;
  currentTetromino.y += dy;
  return true;
}
 
