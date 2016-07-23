function reduceCells(cells) {
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

function reduceColumn(board, column) {
  const cells = board.column(column);
  return reduceCells(cells);
}

function reduceRow(board, row){
  const cells = board.row(row);
  return reduceCells(cells);
}

function reduceSquare(board, square) {
  const cells = board.square(square);
  return reduceCells(cells);
}

function simpleReducers() {
  const reducers = [];
  for(let i = 0; i < 9; i++) {
    let v = i;
    reducers.push(board => reduceColumn(board, v));
    reducers.push(board => reduceRow(board, v));
    reducers.push(board => reduceSquare(board, v));
  }

  return reducers;
}

export default function reduce(board) {
  let updated = board.clone();
  const reducers = simpleReducers();

  let rounds = 0;
  const combiner = function (count, reducer) {
    return count + reducer(board);
  };

  while (reducers.reduce(combiner, 0) > 0) {
    rounds++;
  }

  return board;
}
