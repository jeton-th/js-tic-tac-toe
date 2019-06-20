function play(element) {
  let player = gameBoard.turn();
  element.disabled = true;

  gameBoard.addMark(element.id, player);

  if(gameBoard.checkWinner()){
    // disable all buttons
    console.log('Winner is ');
  } else if (gameBoard.isFull()) {
    console.log('We have a tie!');
  } 
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

  const isFull = () => {
    const zero2 = board.filter(a => a == 0);
    if (zero2.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const checkWinner = () => {
    if(
      board[0] && board[1] && board[2] == "X" ||
      board[0] && board[1] && board[2] == "O" ||
      board[3] && board[4] && board[5] == "X" ||
      board[3] && board[4] && board[5] == "O" ||
      board[6] && board[7] && board[8] == "X" ||
      board[6] && board[7] && board[8] == "O" ||

      board[0] && board[3] && board[6] == "X" ||
      board[0] && board[3] && board[6] == "O" ||
      board[1] && board[4] && board[7] == "X" ||
      board[1] && board[4] && board[7] == "O" ||
      board[2] && board[5] && board[8] == "X" ||
      board[2] && board[5] && board[8] == "O" ||

      board[0] && board[4] && board[8] == "X" ||
      board[0] && board[4] && board[8] == "O" ||
      board[2] && board[4] && board[6] == "X" ||
      board[2] && board[4] && board[6] == "O"
    ) {
      return true;
    }
  }

  const addMark = (index, player) => {
    board[index] = player == player1 ? player1.symbol : player2.symbol;
  };

  return {
    board,
    turn,
    addMark,
    isFull,
    checkWinner
  };
})();

const displayController = (() => {


})();

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
