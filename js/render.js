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

  // 숨겨진 상단 행은 렌더링하지 않음
  for (let row = HIDDEN_ROWS; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      const value = board[row][col];

      const x = col * BLOCK_SIZE;
      const y = (row - HIDDEN_ROWS) * BLOCK_SIZE;

      drawCell(ctx, x, y, value);
    }
  }
}

/* ===============================
   테트로미노 그리기
   =============================== */

/**
 * 현재 테트로미노를 canvas에 렌더링한다.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} tetromino
 */
function drawTetromino(ctx, tetromino) {
  const { matrix, x: offsetX, y: offsetY, value } = tetromino;

  // 테트로미노 행렬 순회
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) continue;

      const x = (offsetX + col) * BLOCK_SIZE;
      const y = (offsetY + row) * BLOCK_SIZE;

      drawCell(ctx, x, y, value);
    }
  }
}

/* ===============================
   테트로미노 렌더링
   =============================== */

/**
 * 현재 테트로미노를 canvas에 렌더링한다.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} tetromino
 */
function renderTetromino(ctx, tetromino) {
  const { matrix, x: offsetX, y: offsetY } = tetromino;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];

      // 비어있는 셀은 렌더링하지 않음
      if (value === 0) continue;

      const x = (offsetX + col) * BLOCK_SIZE;
      const y = (offsetY + row) * BLOCK_SIZE;

      // matrix 값 그대로 색상 인덱스로 사용
      drawCell(ctx, x, y, value);
    }
  }
}
