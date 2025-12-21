    const canvas = document.getElementById("tetris");
    const ctx = canvas.getContext("2d");
    const rows = 20;
    const columns = 10;
    const blockSize = 32;

    ctx.scale(blockSize, blockSize);

    const tetrominos = [
  { shape: [[1, 1, 1, 1]], color: '#00FFFF' }, // I
  { shape: [[1, 1, 1], [0, 1, 0]], color: '#FF00FF' }, // T
  { shape: [[1, 1], [1, 1]], color: '#FFFF00' }, // O
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#00FF00' }, // S
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#FF0000' }, // Z
  { shape: [[1, 0, 0], [1, 1, 1]], color: '#FFA500' }, // L
  { shape: [[0, 0, 1], [1, 1, 1]], color: '#0000FF' }, // J
];

    function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawPiece();
}

    function createPiece() {
  const index = Math.floor(Math.random() * tetrominos.length);
  const piece = tetrominos[index];

  return {
    shape: piece.shape.map(row => row.slice()),
    color: piece.color
  };
}

    function update() {
  draw();
  requestAnimationFrame(update);
}

update();



    const board = Array.from({ length: rows }, () => Array(columns).fill(null));

    let currentPiece = createPiece();
    let currentPos = { x: 3, y: 0 };
    let gameInterval = null; // 게임 루프를 저장할 변수

    function drawBoard() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (board[y][x]) {
            ctx.fillStyle = board[y][x];
            ctx.fillRect(x, y, 1, 1);
            ctx.strokeRect(x, y, 1, 1);
          }
        }
      }
    }

    function drawPiece() {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            ctx.fillStyle = currentPiece.color;
            ctx.fillRect(currentPos.x + x, currentPos.y + y, 1, 1);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(currentPos.x + x, currentPos.y + y, 1, 1);
          }
        }
      }
    }


    function collide() {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (
            currentPiece.shape[y][x] &&
            (board[currentPos.y + y]?.[currentPos.x + x] !== null)
          ) {
            return true;
          }
        }
      }
      return false;
    }


    function placePiece() {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            board[currentPos.y + y][currentPos.x + x] = currentPiece.color;
          }
        }
      }
      clearLines();
      resetPiece();
    }


    function clearLines() {
      for (let y = rows - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== null)) {
          board.splice(y, 1);
          board.unshift(Array(columns).fill(null));
        }
      }
    }

    function resetPiece() {
      currentPiece = createPiece();
      currentPos = { x: 3, y: 0 };

      if (collide()) {
        alert('Game Over');
        board.forEach(row => row.fill(null));
      }
    }


    function rotate() {
      const temp = currentPiece;
      currentPiece = currentPiece[0].map((_, index) => currentPiece.map(row => row[index])).reverse();
      if (collide()) {
        currentPiece = temp;
      }
    }

    function moveDown() {
      currentPos.y++;
      if (collide()) {
        currentPos.y--;
        placePiece();
      }
    }

    function moveLeft() {
      currentPos.x--;
      if (collide()) {
        currentPos.x++;
      }
    }

    function moveRight() {
      currentPos.x++;
      if (collide()) {
        currentPos.x--;
      }
    }

    function gameLoop() {
      drawBoard();
      drawPiece();
      moveDown();
    }

    document.addEventListener('keydown', (e) => {
      if (!gameInterval) return; // 게임 시작 전엔 키 입력 무시
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'ArrowDown') moveDown();
      if (e.key === 'ArrowUp') rotate();
    });

    // 🎯 버튼 클릭 시 게임 시작
    document.getElementById('startBtn').addEventListener('click', () => {
      canvas.style.display = 'block'; // 캔버스 보여주기
      document.getElementById('startBtn').style.display = 'none'; // 버튼 숨기기
      if (!gameInterval) {
        gameInterval = setInterval(gameLoop, 500); // 0.5초마다 게임 루프
      }
    });
