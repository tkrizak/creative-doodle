const gameBoard = document.querySelector('.game__board');
const cellCount = 50;

for (let i = 0; i < cellCount ** 2; i++) {
  const gameCell = document.createElement('div');
  gameCell.className = 'game__cell';
  gameBoard.appendChild(gameCell);
}

const gameCellNodes = document.querySelectorAll('.game__cell');

function adjustCellSize() {
  const gameBoardSize = 600;
  const totalCells = gameCellNodes.length;

  const columns = Math.ceil(Math.sqrt(totalCells));

  const cellSize = gameBoardSize / columns;

  gameCellNodes.forEach((cell) => {
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
  });
}

function handleCellFill() {
  let isMouseDown = false;

  gameBoard.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  gameBoard.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  gameCellNodes.forEach((cell) => {
    cell.addEventListener('mousedown', () => {
      cell.style.backgroundColor = 'red';
    });

    cell.addEventListener('mouseenter', () => {
      if (isMouseDown) {
        cell.style.backgroundColor = 'red';
      }
    });
  });
}

handleCellFill();
adjustCellSize();
