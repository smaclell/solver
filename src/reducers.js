function solvedCell(cells) {
  const values = cells.map(c => c.value);

  let reduced = 0;
  cells.filter(c => !c.solved).forEach(c => {
    values.forEach(v => c.remove(v));
    if (c.solve()) {
      reduced++;
    }
  });

  return reduced;
}

function singleOption(cells) {
  let reduced = 0;
  const remaining = {};

  cells.filter(c => !c.solved).forEach(c => {
    c.options.forEach(v => {
      remaining[v] = remaining[v] || [];
      remaining[v].push(c);
    });
  });

  const values = cells.filter(c => c.solved).map(c => c.value);
  Object.keys(remaining).forEach(v => {
    const value = parseInt(v, 10);
    const options = remaining[value];
    if (!values.includes(value) && options.length === 1) {
      options[0].set(value);
      reduced++;
    }
  });

  return reduced;
}

function hiddenPair(cells) {
  const ignored = [];

  for (let i = 0; i < cells.length && ignored.length < 8; i++) {
    const cell = cells[i];
    if (cell.solved) {
      ignored.push(cell.value);
      continue;
    }

    const candidates = [];
    for (let j = 0; j < cell.options.length; j++) {
      const o = cell.options[j];
      if (ignored.includes(o)) {
        continue;
      }

      const filtered = cells.filter((c, x) => x > i && c.options.includes(o));
      if (filtered.length === 1) {
        const other = filtered[0];
        const candidate = candidates.find(p => p.other === other);
        if (!candidate) {
          candidates.push({ other, match: o });
        } else {
          const match = candidate.match;
          const reduced = cell.options.length + other.options.length - 4;

          cell.options = [match, o];
          other.options = [match, o];
          return reduced;
        }
      } else {
        ignored.push(o);
      }
    }
  }

  return 0;
}

function breaker(current, target) { // eslint-disable-line no-unused-vars
  const properties = ['v', 'type', 'cellReducer'];
  const miss = !!properties.find(prop => current[prop] !== target[prop]);
  return !miss;
}

function reduceEach(cellReducer) {
  const types = ['column', 'row', 'square'];
  let reducers = [];
  for (let i = 0; i < 9; i++) {
    const v = i;
    reducers = reducers.concat(types.map(
      type => board => {
        /*
        if (breaker({v, type, cellReducer}, {v:0, type: 'square', cellReducer: hiddenPair})) {
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
  const combiner = (count, reducer) => count + reducer(board);

  while (reducers.reduce(combiner, 0) > 0) {
    rounds++;
  }

  return rounds;
}

export default function reduce(board) {
  const updated = board.clone();
  let rounds = 0;

  do {
    rounds = 0;
    rounds += stablize(updated, solvedCell);
    rounds += stablize(updated, singleOption);
    rounds += stablize(updated, hiddenPair);
    // TODO: Lines
  } while (rounds > 0);

  return updated;
}
