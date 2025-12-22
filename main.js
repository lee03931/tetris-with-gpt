const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

let gameState = "START"; // START | PLAYING | GAME_OVER

startBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  if (!nickname) {
    alert("닉네임을 입력하세요");
    return;
  }

  localStorage.setItem("nickname", nickname);

  startScreen.style.display = "none";
  gameState = "PLAYING";
  startGame();
});


const nicknameInput = document.getElementById("nickname-input");
const rankingList = document.getElementById("ranking-list");

function loadRanking() {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingList.innerHTML = "";

  ranking.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} - ${item.score}`;
    rankingList.appendChild(li);
  });
}

const savedNickname = localStorage.getItem("nickname");
if (savedNickname) {
  nicknameInput.value = savedNickname;
}


function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 임시 테스트 표시
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Game Started", 60, 300);
}
