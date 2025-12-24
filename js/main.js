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


/* ===============================
   게임 초기화
   =============================== */
function init() {
  // 캔버스 초기 상태 설정
  ctx.scale(1, 1); // 추후 해상도 대응 시 수정 가능

  // 게임 루프 시작
  requestAnimationFrame(gameLoop);
}


/* ===============================
   게임 상태 업데이트
   =============================== */
function update(deltaTime) {
  // deltaTime: 이전 프레임과의 시간 차(ms)

  // 블록 자동 낙하 로직은 추후 추가
  dropCounter += deltaTime;
}


/* ===============================
   화면 렌더링
   =============================== */
function render() {
  // 화면 초기화
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 실제 보드/블록 렌더링은 render.js에서 처리 예정
}


/* ===============================
   메인 게임 루프
   =============================== */
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
init();

