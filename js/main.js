/**
 * main.js
 * -----------------------------
 * 테트리스 게임의 진입점(Entry Point)
 * - canvas 초기화
 * - 게임 루프 관리
 * - 전체 게임 흐름 제어
 */

/* ===============================
   캔버스 초기화
   =============================== */

// canvas DOM 요소 가져오기
const canvas = document.getElementById("tetris-canvas");

// 2D 렌더링 컨텍스트 생성
const ctx = canvas.getContext("2d");

// config.js에서 정의한 값으로 canvas 크기 설정
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;


/* ===============================
   게임 루프 관련 변수
   =============================== */

// 이전 프레임의 시간 (ms)
let lastTime = 0;

// 누적 시간 (블록 낙하 등에 사용 예정)
let dropCounter = 0;

// 자동 낙하 간격 (ms)
const DROP_INTERVAL = 1000;

// lock delay 관련
const LOCK_DELAY = 3000;
let lockDelayStartTime = null;

/* ===============================
   게임 초기화
   =============================== */

/**
 * 게임 초기 진입 함수
 * - 캔버스 기본 상태 설정
 * - 테트로미노 초기 생성
 * - 메인 게임 루프 시작
 */
function init() {
  // 캔버스 초기 상태 설정
  ctx.scale(1, 1); // 추후 해상도 대응 시 수정 가능

  // 최초 테트로미노 생성
  currentTetromino = createTetromino();

  // 게임 루프 시작
  requestAnimationFrame(gameLoop);
}



/* ===============================
   게임 상태 업데이트
   =============================== */

/**
 * 게임 상태를 업데이트한다.
 * @param {number} deltaTime - 이전 프레임과의 시간 차(ms)
 */
function update(deltaTime) {
   dropCounter += deltaTime;

   if (dropCounter >= DROP_INTERVAL) {
      tryMoveDown();
      dropCounter = 0;
   }
}

/* ===============================
   테트로미노 상태 관리
   =============================== */

// 현재 조작 중인 테트로미노 객체
let currentTetromino = null;

/* ===============================
   테트로미노 이동 (아래)
   =============================== */

/**
 * 테트로미노를 한 칸 아래로 이동 시도한다.
 * - 이동 성공 시: lock delay 초기화
 * - 이동 실패 시: lock delay 시작 또는 검사
 */
function tryMoveDown() {
  // 아래로 이동 시도
  if (tryMove(currentTetromino, 0, 1, getBoard())) {
    // 이동 성공 → lock delay 리셋
    lockDelayStartTime = null;
    return;
  }

  // 아래 이동 실패 → 바닥 접촉 상태
  if (lockDelayStartTime === null) {
    lockDelayStartTime = performance.now();
    return;
  }

  // lock delay 시간 초과 검사
  const elapsed = performance.now() - lockDelayStartTime;
  if (elapsed >= LOCK_DELAY) {
    lockTetromino(currentTetromino, getBoard());
    clearLines();

    // 새 테트로미노 스폰
    currentTetromino = createTetromino();
    lockDelayStartTime = null;
  }
}

/* ===============================
   테트로미노 렌더링
   =============================== */

/**
 * 현재 테트로미노를 canvas에 그린다
 * @param {CanvasRenderingContext2D} ctx
 */
function drawCurrentTetromino(ctx) {
  const { matrix, x, y } = currentTetromino;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];
      if (value === 0) continue;

      // 테트로미노 좌표를 보드 좌표로 변환
      const drawX = (x + col) * BLOCK_SIZE;
      const drawY = (y + row) * BLOCK_SIZE;

      drawCell(ctx, drawX, drawY, value);
    }
  }
}

/* ===============================
   화면 렌더링
   =============================== */
function render() {
  // 화면 초기화
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 고정된 보드 렌더링
  drawBoard(ctx);

  // 현재 테트로미노 렌더링
  renderTetromino(ctx, currentTetromino);
}

/* ===============================
   메인 게임 루프
   =============================== */

/**
 * 테트리스 메인 게임 루프
 * - 시간 계산
 * - 상태 업데이트
 * - 화면 렌더링
 * @param {number} time - requestAnimationFrame이 전달하는 현재 시간
 */
function gameLoop(time = 0) {
  // 현재 프레임과 이전 프레임의 시간 차 계산
  const deltaTime = time - lastTime;
  lastTime = time;

  // 게임 상태 업데이트
  update(deltaTime);

  // 화면 그리기
  render();

  // 다음 프레임 요청
  requestAnimationFrame(gameLoop);
}


/* ===============================
   게임 시작
   =============================== */

// 게임 초기화 실행
init();

