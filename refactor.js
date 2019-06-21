/* eslint no-param-reassign: ["error", { "props": false }] */
const boxes = document.querySelectorAll('.box');

const Board = () => {
  let getBoard = new Array(9).fill(0);
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ];
  const addMark = (index, player) => {
    getBoard[index] = player === player1 ? player1.symbol : player2.symbol;
  };

  const checkWinner = () => {
    let winner = false;
    combos.forEach(combo => {
      if (combo.every(e => getBoard[e] === 'X')) winner = true;
      if (combo.every(e => getBoard[e] === 'O')) winner = true;
    });
    return winner;
  };

  const isFull = () => {
    const zero2 = getBoard.filter(a => a === 0);
    if (zero2.length === 0) {
      return true;
    }
    return false;
  };

  return { getBoard, combos, addMark, checkWinner, isFull };
};

const Player = (name, symbol) => ({ name, symbol });
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const displayController = (() => {
  const setName = () => {
    const name1 = document.querySelector('.name1');
    player1.name = name1.value ? name1.value : player1.name;
    name1.disabled = true;

    const name2 = document.querySelector('.name2');
    player2.name = name2.value ? name2.value : player2.name;
    name2.disabled = true;
  };

  const winner = player => {
    document.querySelector('.msg').innerHTML = `Game over. <br> Winner is ${
      player.name
    }.`;
  };

  const tie = () => {
    document.querySelector('.msg').innerHTML = 'Game over. <br> We have a tie.';
  };

  const changeName = () => {
    const name1 = document.querySelector('.name1');
    name1.disabled = false;

    const name2 = document.querySelector('.name2');
    name2.disabled = false;
  };

  const clearMessage = () => {
    document.querySelector('.msg').innerHTML = '';
    boxes.forEach(box => {
      box.disabled = false;
      box.value = '';
    });
  };

  const disable = () => {
    boxes.forEach(box => {
      box.disabled = true;
    });
  };
  return {
    setName,
    winner,
    changeName,
    tie,
    clearMessage,
    disable
  };
})();

boxes.forEach(box => {
  box.addEventListener('click', () => {
    const player =
      newBoard.getBoard.filter(a => a === 0).length % 2 === 0
        ? player2
        : player1;

    box.disabled = true;
    box.value = player.symbol;

    displayController.setName();
    newBoard.addMark(box.id, player);

    if (newBoard.checkWinner()) {
      displayController.disable();
      displayController.winner(player);
    } else if (newBoard.isFull()) {
      displayController.tie();
    }
  });
});

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
  newBoard = Board();

  displayController.changeName();
  displayController.clearMessage();
});
let newBoard = Board();

// A function that checks a particular moves array in comparison to the winning combinations array to find out whether there's a match -> returns true if there is and returns false if there aren't

//1. We cannot put turn inside of the player because how factories were created.
// Turn function will return what is the current player turn
