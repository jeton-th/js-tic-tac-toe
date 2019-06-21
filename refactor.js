/* eslint no-param-reassign: ["error", { "props": false }] */
const boxes = document.querySelectorAll('.box');
const restartButton = document.querySelector('.restart');

const Player = (name, symbol) => ({ name, symbol });
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const Board = () => {
  const getBoard = new Array(9).fill(0);
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  const addMark = (index, player) => {
    getBoard[index] = player === player1 ? player1.symbol : player2.symbol;
  };

  const checkWinner = () => {
    let winner = false;
    combos.forEach((combo) => {
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

  return {
    getBoard,
    combos,
    addMark,
    checkWinner,
    isFull,
  };
};

const display = (() => {
  const setName = () => {
    const name1 = document.querySelector('.name1');
    player1.name = name1.value ? name1.value : player1.name;
    name1.disabled = true;

    const name2 = document.querySelector('.name2');
    player2.name = name2.value ? name2.value : player2.name;
    name2.disabled = true;
  };

  const disablePlayer2 = () => {
    const name2 = document.querySelector('.name2');
    name2.value = 'Bot';
    name2.disabled = true;
  };

  const winner = (player) => {
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
    boxes.forEach((box) => {
      box.disabled = false;
      box.value = '';
    });
  };

  const disable = () => {
    boxes.forEach((box) => {
      box.disabled = true;
    });
  };

  return {
    setName,
    changeName,
    clearMessage,
    disablePlayer2,
    disable,
    winner,
    tie,
  };
})();

let newBoard = Board();

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    botButton.disabled = true;
    let player = newBoard.getBoard.filter(a => a === 0).length % 2 === 0 ? player2 : player1;

    if (isBot) {
      player = player1;
    }

    box.disabled = true;
    box.value = player.symbol;

    display.setName();
    newBoard.addMark(box.id, player);


    if (newBoard.checkWinner()) {
      display.disable();
      display.winner(player);
    } else if (newBoard.isFull()) {
      display.tie();
    }


    if (isBot) {
      bot.play();
    }
  });
});

restartButton.addEventListener('click', () => {
  newBoard = Board();
  botButton.disabled = false;
  display.changeName();
  display.clearMessage();
});


// Bot addition

const bot = (() => {
  const play = () => {
    const botPlay = [];

    newBoard.getBoard.forEach((e, i) => {
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
  display.disablePlayer2();
  isBot = true;
});
