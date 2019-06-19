function play(element) {
  let player = gameBoard.turn();

  gameBoard.addMark(element.id, player);
  // console.log(gameBoard.isGameOver());
  if (gameBoard.isGameOver()) {
    console.log('Game Over!');
  } else {
    console.log('Game is still on');
  }
  // let currentPlayer =
}

const gameBoard = (() => {
  const board = new Array(9).fill(0);

  const turn = () => {
    const zero = board.filter(a => a == 0);
    console.log(board);
    if (zero.length % 2 == 0) {
      return player2;
    } else {
      return player1;
    }
  };

  const isGameOver = () => {
    const zero2 = board.filter(a => a == 0);
    if (zero2.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const addMark = (index, player) => {
    board[index] = player == player1 ? player1.symbol : player2.symbol;
  };

  return {
    board,
    turn,
    addMark,
    isGameOver
  };
})();

const displayController = (() => {})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { name, symbol };
};

let player1 = Player('jim', 'X');
let player2 = Player('john', 'O');

// Player 1 : Symbol will be X, name player1
// Player 2 : Symbol will be X, name player2

// console.log(player2);
