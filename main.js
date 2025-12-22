const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

let gameState = "START"; // START | PLAYING | GAME_OVER

startBtn.addEventListener("click", () => { //게임 시작 처리
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
console.log("rankingList:", rankingList);

function loadRanking() { //랭킹 불러오기
  console.log("loadRanking 실행됨");

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  rankingList.innerHTML = "";

  ranking.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} - ${item.score}`;
    rankingList.appendChild(li);
  });
}


const savedNickname = localStorage.getItem("nickname"); //닉네임 자동로드
if (savedNickname) {
  nicknameInput.value = savedNickname;
}

function saveScore(score) { //점수 저장
  const nickname = localStorage.getItem("nickname");
  if (!nickname) return;

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({ name: nickname, score });
  ranking.sort((a, b) => b.score - a.score);

  const top10 = ranking.slice(0, 10);
  localStorage.setItem("ranking", JSON.stringify(top10));
}

saveScore(currentScore);
loadRanking();
startScreen.style.display = "flex";

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 임시 테스트 표시
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Game Started", 60, 300);
}

function injectTestRanking() { //테스트용 코드
  const testRanking = [
    { name: "하나", score: 10 },
    { name: "둘", score: 9 },
    { name: "셋", score: 8 },
    { name: "넷", score: 7 },
    { name: "다섯", score: 6 },
    { name: "여섯", score: 5 },
    { name: "일곱", score: 4 },
    { name: "여덟", score: 3 },
    { name: "아홉", score: 2 },
    { name: "열", score: 1 },
  ];

  localStorage.setItem("ranking", JSON.stringify(testRanking));
}

injectTestRanking();
loadRanking();
