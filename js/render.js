/**
 * render.js
 * -----------------------------
 * 화면 렌더링 전담 모듈
 * - 테트리스 보드를 canvas에 그린다
 */

/* ===============================
   셀(블록) 그리기
   =============================== */

/**
 * 단일 셀(블록)을 그린다.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x - canvas x 좌표
 * @param {number} y - canvas y 좌표
 * @param {number} value - 보드 값 (0 ~ 7)
 */
function drawCell(ctx, x, y, value) {
  if (value === 0) return;

  // 블록 채우기
  ctx.fillStyle = COLORS[value];
  ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);

  // 블록 테두리 (시각적 구분)
  ctx.strokeStyle = "#111";
  ctx.lineWidth = BLOCK_BORDER_WIDTH;
  ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
}


/* ===============================
   보드 전체 그리기
   =============================== */

/**
 * 현재 보드 상태를 canvas에 렌더링한다.
 * @param {CanvasRenderingContext2D} ctx
 */
function drawBoard(ctx) {
  const board = getBoard();

  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      const value = board[row][col];

      const x = col * BLOCK_SIZE;
      const y = row * BLOCK_SIZE;

      drawCell(ctx, x, y, value);
    }
  }
}

