function play(element) {
  let player = gameBoard.turn();
  element.disabled = true;
  element.value = player.symbol

  gameBoard.addMark(element.id, player);

  if(gameBoard.checkWinner()){
    // disable all buttons
    console.log(`Game over. Winner is ${player.name}.`);
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
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ]

    let winner = false;
    combos.forEach((combo) => {
      if(combo.every(e => board[e] == 'X')) winner = true;
      if(combo.every(e => board[e] == 'O')) winner = true;
    })
    return winner;
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

let player1 = Player('Jim', 'X');
let player2 = Player('John', 'O');

// Player 1 : Symbol will be X, name player1
// Player 2 : Symbol will be X, name player2

// console.log(player2);
