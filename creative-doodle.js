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

  sizeInput.addEventListener('touchend', () => {
    cellCount = sizeInput.value;
    buildGameBoard();
  });
}

updateGameBoard();

// Makes the slider adjust dynamically on window resizing and  different screen sizes

function adjustMaxValue() {
  const newMax = window.innerWidth < 600 ? 50 : 100;

  if (sizeInput.value > newMax) {
    sizeInput.value = newMax;
    sizeInputText.textContent = `${newMax} x ${newMax}`;
    cellCount = sizeInput.value;
    buildGameBoard();
  }
  sizeInput.max = newMax;
}

window.addEventListener('resize', () => {
  adjustMaxValue();
  sizeInputText.textContent = `${sizeInput.value} x ${sizeInput.value}`;
});

adjustMaxValue();

// Clears game board

function clearGameBoard() {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
}

// Renders game board filled with empty cells based on selected size

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

// Changes cell color fill based on given conditions like color picker, random color or erase on mouse movement

function handleCellFill(gameCellNodes) {
  let isMouseDown = false;

  function handleCellInteraction(cell) {
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

  gameBoard.addEventListener('mousedown', () => {
    isMouseDown = true;
  });
  gameBoard.addEventListener('mouseup', () => {
    isMouseDown = false;
  });
  gameBoard.addEventListener('touchstart', (event) => {
    event.preventDefault();
    isMouseDown = true;
  });

  gameCellNodes.forEach((cell) => {
    cell.addEventListener('mousedown', () => {
      handleCellInteraction(cell);
    });

    cell.addEventListener('mouseenter', () => {
      if (isMouseDown) {
        handleCellInteraction(cell);
      }
    });

    cell.addEventListener('touchstart', () => {
      handleCellInteraction(cell);
    });
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
      randomColorBtn.classList.add('rainbow');
      randomColorToggled = true;

      eraserBtn.classList.remove('selected');
      isErasing = false;
    } else {
      randomColorBtn.classList.remove('rainbow');
      randomColorToggled = false;
    }
  });

  colorPicker.addEventListener('click', () => {
    randomColorBtn.classList.remove('rainbow');
    randomColorToggled = false;
  });

  sizeInput.addEventListener('mouseup', () => {
    randomColorBtn.classList.remove('rainbow');
    randomColorToggled = false;
  });
}

toggleRandomColor();

// Toggles erasing button on different interactions with the game

function toggleErasing() {
  isErasing = false;

  eraserBtn.addEventListener('click', () => {
    if (!isErasing) {
      eraserBtn.classList.add('selected');
      isErasing = true;

      randomColorBtn.classList.remove('rainbow');
      randomColorToggled = false;
    } else {
      eraserBtn.classList.remove('selected');
      isErasing = false;
    }
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

toggleErasing();

buildGameBoard();
