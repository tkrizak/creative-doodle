const sizeInput = document.getElementById('size-input');
const sizeInputText = document.querySelector('.size-input-text');
const gameBoard = document.querySelector('.game__sketch__board');
const colorPicker = document.querySelector('.color-picker');
const eraser = document.querySelector('.eraser');

let cellCount = sizeInput.value;
sizeInputText.textContent = `${cellCount} x ${cellCount}`;

// Updates game board with a slider

function updateGameBoard() {
  sizeInput.addEventListener('input', () => {
    sizeInputText.textContent = `${sizeInput.value} x ${sizeInput.value}`;
  });

  sizeInput.addEventListener('mouseup', () => {
    cellCount = sizeInput.value;
    buildGameBoard();
  });
}

updateGameBoard();

// Clears game board

function clearGameBoard() {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }

  eraser.classList.remove('selected');
}

// Renders game board filled with cells with selected sizes

function buildGameBoard() {
  clearGameBoard();

  gameBoard.style.gridTemplateColumns = `repeat(${cellCount}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${cellCount}, 1fr)`;

  for (let i = 0; i < cellCount ** 2; i++) {
    const gameCell = document.createElement('div');
    gameCell.className = 'game__sketch__cell';
    gameBoard.appendChild(gameCell);
  }
  const gameCellNodes = document.querySelectorAll('.game__sketch__cell');

  handleCellFill(gameCellNodes);
}

// Fills out a game cell with selecter color based on mouse movement

function handleCellFill(gameCellNodes) {
  let isSelected = false;
  let isMouseDown = false;

  eraser.addEventListener('click', () => {
    if (!isSelected) {
      eraser.classList.add('selected');
      isSelected = true;
    } else {
      eraser.classList.remove('selected');
      isSelected = false;
    }

    console.log(isSelected);
  });

  gameBoard.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  gameBoard.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  gameCellNodes.forEach((cell) => {
    cell.addEventListener('mousedown', () => {
      if (isSelected) {
        cell.style.backgroundColor = '#ffffff';
      } else {
        cell.style.backgroundColor = `${colorPicker.value}`;
      }
    });

    cell.addEventListener('mouseenter', () => {
      if (isMouseDown) {
        if (isSelected) {
          cell.style.backgroundColor = '#ffffff';
        } else {
          cell.style.backgroundColor = `${colorPicker.value}`;
        }
      }
    });
  });
}

buildGameBoard();
