const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

let gameState = "START"; // START | PLAYING | GAME_OVER

startBtn.addEventListener("click", () => {
  gameState = "PLAYING";
  startScreen.style.display = "none";
  startGame();
});

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 임시 테스트 표시
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Game Started", 60, 300);
}
