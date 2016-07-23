function solvedCell(cells) {
  const values = cells.map(c => c.value);

  let reduced = 0;
  cells.filter(c => !c.solved).forEach(c => {
    values.forEach(v => c.remove(v));
    if (c.solve()) {
      reduced++;
    }
  })

  return reduced;
}

function reduceEach(cellReducer) {
  const types = ['column', 'row', 'square'];
  let reducers = [];
  for(let i = 0; i < 9; i++) {
    let v = i;
    reducers = reducers.concat(types.map(
      type => board => cellReducer(board[type](v))
    ));
  }

  return reducers;
}

export default function reduce(board) {
  let updated = board.clone();
  const reducers = reduceEach(solvedCell);

  let rounds = 0;
  const combiner = function (count, reducer) {
    return count + reducer(board);
  };

  while (reducers.reduce(combiner, 0) > 0) {
    rounds++;
  }

  return board;
}
