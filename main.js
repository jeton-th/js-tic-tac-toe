const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
  box.addEventListener('click', () => {
    displayController.setName();
    let player = gameBoard.turn();
    box.disabled = true;
    box.value = player.symbol;

    gameBoard.addMark(box.id, player);

    if (gameBoard.checkWinner()) {
      gameBoard.disable();
      displayController.winner(player);
    } else if (gameBoard.isFull()) {
      displayController.tie();
    }
  })
})

let restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
  gameBoard.restart();
  displayController.changeName();
  displayController.clearMessage();
})

const gameBoard = (() => {
  let board = new Array(9).fill(0);

  const disable = () => {
    boxes.forEach(box => {
      box.disabled = true;
    });
  };

  const restart = () => {
    boxes.forEach(box => {
      box.disabled = false;
      box.value = '';
    });
    board = new Array(9).fill(0);
  };

  const turn = () => {
    const zero = board.filter(a => a == 0);
    if (zero.length % 2 == 0) {
      return player2;
    } else {
      return player1;
    }
  };

  const isFull = () => {
    const zero2 = board.filter(a => a == 0);
    if (zero2.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkWinner = () => {
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

    let winner = false;
    combos.forEach(combo => {
      if (combo.every(e => board[e] == 'X')) winner = true;
      if (combo.every(e => board[e] == 'O')) winner = true;
    });
    return winner;
  };

  const addMark = (index, player) => {
    board[index] = player == player1 ? player1.symbol : player2.symbol;
  };

  return {
    board,
    turn,
    addMark,
    isFull,
    checkWinner,
    disable,
    restart
  };
})();

const displayController = (() => {
  const setName = () => {
    let name1 = document.querySelector('.name1');
    player1.name = (name1.value) ? name1.value : player1.name;
    name1.disabled = true;

    let name2 = document.querySelector('.name2');
    player2.name = (name2.value) ? name2.value : player2.name;
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
    let name1 = document.querySelector('.name1');
    name1.disabled = false;

    let name2 = document.querySelector('.name2');
    name2.disabled = false;
  };

  const clearMessage = () => {
    document.querySelector('.msg').innerHTML = '';
  }

  return {
    setName,
    winner,
    changeName,
    tie,
    clearMessage
  };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

let player1 = Player('Player 1', 'X');
let player2 = Player('Player 2', 'O');
