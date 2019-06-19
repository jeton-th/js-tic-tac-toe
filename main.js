function play(element) {
  console.log(element.value)
}

const gameBoard = (() => {
  const board = [];

  return {
    board,
  };
})();

const displayController = (() => {
  // const board = [];

  // return {
  //   board,
  // };
})();


console.log(gameBoard.board)