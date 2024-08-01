const sizeInput = document.getElementById('size-input');
const sizeInputText = document.querySelector('.size-input-text');
const gameBoard = document.querySelector('.game__sketch__board');
const colorPicker = document.querySelector('.color-picker');
const eraserBtn = document.querySelector('.eraser-btn');
const randomColorBtn = document.querySelector('.random-color-btn');

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
  let isMouseDown = false;

  gameBoard.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  gameBoard.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  gameCellNodes.forEach((cell) => {
    cell.addEventListener('mousedown', () => {
      const randomColor = getRandomHexColor();

      if (isErasing) {
        cell.style.backgroundColor = '#ffffff';
      } else if (randomColorToggled) {
        colorPicker.value = randomColor;
        cell.style.backgroundColor = randomColor;
      } else {
        cell.style.backgroundColor = `${colorPicker.value}`;
      }
    });

    cell.addEventListener('mouseenter', () => {
      if (isMouseDown) {
        const randomColor = getRandomHexColor();

        if (isErasing) {
          cell.style.backgroundColor = '#ffffff';
        } else if (randomColorToggled) {
          colorPicker.value = randomColor;
          cell.style.backgroundColor = randomColor;
        } else {
          cell.style.backgroundColor = `${colorPicker.value}`;
        }
      }
    });
  });
}

// Toggles erasing button on different interactions with the game

function toggleErasing() {
  isErasing = false;

  eraserBtn.addEventListener('click', () => {
    if (!isErasing) {
      eraserBtn.classList.add('selected');
      isErasing = true;

      randomColorBtn.classList.remove('selected');
      randomColorToggled = false;
    } else {
      eraserBtn.classList.remove('selected');
      isErasing = false;
    }
    console.log(isErasing);
  });

  colorPicker.addEventListener('click', () => {
    eraserBtn.classList.remove('selected');
    isErasing = false;
  });

  sizeInput.addEventListener('mouseup', () => {
    eraserBtn.classList.remove('selected');
    isErasing = false;
  });
}

// Generates random color

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');

  return `#${randomColor}`;
}

// Toggles random color button on different interactions with the game

function toggleRandomColor() {
  randomColorToggled = false;

  randomColorBtn.addEventListener('click', () => {
    if (!randomColorToggled) {
      randomColorBtn.classList.add('selected');
      randomColorToggled = true;

      eraserBtn.classList.remove('selected');
      isErasing = false;
    } else {
      randomColorBtn.classList.remove('selected');
      randomColorToggled = false;
    }
  });

  colorPicker.addEventListener('click', () => {
    randomColorBtn.classList.remove('selected');
    randomColorToggled = false;
  });

  sizeInput.addEventListener('mouseup', () => {
    randomColorBtn.classList.remove('selected');
    randomColorToggled = false;
  });
}

toggleRandomColor();
toggleErasing();
buildGameBoard();
