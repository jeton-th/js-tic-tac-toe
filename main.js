/* eslint no-param-reassign: ["error", { "props": false }] */
const boxes = document.querySelectorAll('.box');

const Player = (name, symbol) => ({ name, symbol });
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const bot = (() => {
  const play = () => {
    let botPlay = [];

    gameBoard.board.forEach((e, i) => {
      if (e === 0) botPlay.push(i);
    });
    console.log(botPlay);
    let markIndex = botPlay[Math.floor(Math.random() * botPlay.length)];
    let botMark = document.getElementById(markIndex);
    botMark.disabled = true;
    console.log(markIndex);
    botMark.value = player2.symbol;
  };
  return { play };
})();

const botButton = document.querySelector('.bot');
const name2 = document.querySelector('.name2');
let isBot = false;

botButton.addEventListener('click', () => {
  displayController.disablePlayer2();
  isBot = true;
});

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
    const zero = board.filter(a => a === 0);
    // return zero.length % 2 === 1 || isBot ? player1 : player2;

    if (isBot) {
      bot.play();
      return player1;
    } else if (zero.length % 2 === 1) {
      return player1;
    } else {
      return player2;
    }
  };

  const isFull = () => {
    const zero2 = board.filter(a => a === 0);
    if (zero2.length === 0) {
      return true;
    }
    return false;
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
      if (combo.every(e => board[e] === 'X')) winner = true;
      if (combo.every(e => board[e] === 'O')) winner = true;
    });
    return winner;
  };

  const addMark = (index, player) => {
    board[index] = player === player1 ? player1.symbol : player2.symbol;
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
  const disablePlayer2 = () => {
    const name2 = document.querySelector('.name2');
    name2.value = 'Bot';
    name2.disabled = true;
  };

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
    name2.disabled = false;
  };

  const clearMessage = () => {
    document.querySelector('.msg').innerHTML = '';
  };

  return {
    setName,
    winner,
    changeName,
    tie,
    clearMessage,
    disablePlayer2
  };
})();

boxes.forEach(box => {
  box.addEventListener('click', () => {
    botButton.disabled = true;
    box.disabled = true;
    const player = gameBoard.turn();
    box.value = player.symbol;

    displayController.setName();
    gameBoard.addMark(box.id, player);

    if (gameBoard.checkWinner()) {
      gameBoard.disable();
      displayController.winner(player);
    } else if (gameBoard.isFull()) {
      displayController.tie();
    }
  });
});

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
  botButton.disabled = false;
  name2.value = '';
  gameBoard.restart();
  displayController.changeName();
  displayController.clearMessage();
});
