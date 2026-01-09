/**
 * board.js
 * -----------------------------
 * 테트리스 게임 보드 관리 모듈
 * - 보드 생성
 * - 보드 초기화
 * - 라인 제거 로직
 */

/* ===============================
   보드 생성
   =============================== */

/**
 * 빈 테트리스 보드를 생성한다.
 * @returns {number[][]} 2차원 배열 보드
 */
function createBoard() {
  // BOARD_ROWS x BOARD_COLS 크기의 2D 배열 생성
  return Array.from({ length: BOARD_ROWS }, () =>
    Array(BOARD_COLS).fill(0) // 0은 빈 칸
  );
}


/* ===============================
   보드 상태
   =============================== */

// 현재 게임에서 사용 중인 보드
let board = createBoard();


/* ===============================
   보드 초기화
   =============================== */

/**
 * 보드를 초기 상태로 리셋한다.
 * (게임 재시작 시 사용)
 */
function resetBoard() {
  board = createBoard();
}

/* ===============================
   테트로미노 고정
   =============================== */

/**
 * 현재 테트로미노를 보드에 고정한다.
 * @param {Object} tetromino - 고정할 테트로미노
 */
function lockTetromino(tetromino) {
  const { matrix, x, y } = tetromino;

  // 테트로미노의 모든 셀을 보드에 반영
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // 빈 칸은 무시
      if (matrix[row][col] === 0) continue;

      const boardX = x + col;
      const boardY = y + row;

      // hidden row 위는 실제 보드에 고정하지 않음
      if (boardY < HIDDEN_ROWS) continue;

      // 보드에 블록 고정
      board[boardY][boardX] = matrix[row][col];
    }
  }
}

/* ===============================
   라인 제거 로직
   =============================== */

/**
 * 가득 찬 라인을 검사하고 제거한다.
 * @returns {number} 제거된 라인 수
 */
function clearLines() {
  let linesCleared = 0;

  // 아래에서 위로 검사 (테트리스 표준 방식)
  outer: for (let row = BOARD_ROWS - 1; row >= 0; row--) {
    for (let col = 0; col < BOARD_ROWS; col++) {
      if (board[row][col] === 0) {
        // 빈 칸이 하나라도 있으면 이 줄은 제거 불가
        continue outer;
      }
    }

    // 이 줄은 가득 찬 상태 → 제거
    board.splice(row, 1);

    // 맨 위에 빈 줄 추가
    board.unshift(Array(BOARD_COLS).fill(0));

    linesCleared++;
    row++; // 같은 row 인덱스를 다시 검사
  }

  return linesCleared;
}


/* ===============================
   보드 접근자 (Getter)
   =============================== */

/**
 * 현재 보드 상태를 반환한다.
 * (외부에서 직접 board를 조작하지 않도록 보호)
 * @returns {number[][]}
 */
function getBoard() {
  return board;
}
