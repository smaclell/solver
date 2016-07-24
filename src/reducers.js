const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

function singleOption(cells) {
  let reduced = 0;
  let remaining = {};

  cells.filter(c => !c.solved).forEach(c => {
    c.options.forEach(v => {
      remaining[v] = remaining[v] || [];
      remaining[v].push(c);
    });
  });

  const values = cells.filter(c => c.solved).map(c => c.value);
  Object.keys(remaining).forEach(value => {
    const options = remaining[value];
    if (!values.includes(value) && options.length === 1) {
      options[0].set(value);
      reduced++;
    }
  });

  return reduced;
}

function breaker(current, target) {
  const properties = ['v', 'type', 'cellReducer'];
  const miss = !!properties.find(prop => current[prop] !== target[prop]);
  return !miss;
}

function reduceEach(cellReducer) {
  const types = ['column', 'row', 'square'];
  let reducers = [];
  for(let i = 0; i < 9; i++) {
    let v = i;
    reducers = reducers.concat(types.map(
      type => board => {
        /*
        if (breaker({v, type, cellReducer}, {v:3, type: 'square', cellReducer: singleOption})) {
          console.log('x');
        }
        */

        const cells = board[type](v);
        return cellReducer(cells);
      }
    ));
  }

  return reducers;
}

function stablize(board, cellReducer) {
  const reducers = reduceEach(cellReducer);

  let rounds = 0;
  const combiner = function (count, reducer) {
    return count + reducer(board);
  };

  while (reducers.reduce(combiner, 0) > 0) {
    rounds++;
  }
}

export default function reduce(board) {
  let updated = board.clone();

  stablize(board, solvedCell);
  stablize(board, singleOption);
  // TODO: Hidden pairs
  // TODO: Lines

  return board;
}
