import Cell from './cell'

class Board {
  constructor(lookup = () => new Cell()) {
    let rows = [];
    for(let x = 0; x < 9; x++) {
      let row = [];
      rows.push(row);
      for(let y = 0; y < 9; y++) {
        row.push(lookup(x,y));
      }
    }

    this.rows = rows;
  }

  static from(rows, q = 0) {
    let board = new Board();

    if (rows.length !== 9) {
      throw ("There was not 9 rows, instead there were " + rows.length)
    }

    for(let y = 0; y < 9; y++) {
      const row = rows[y];
      if (row.length !== 9) {
        throw ("There was not 9 columns in row " + (y + 1) + ", instead there were " + row.length)
      }

      for (let x = 0; x < 9; x++) {
        const v = row[x];
        if (v !== q) {
          board.cell(x, y).set(v);
        }
      }
    }

    return board;
  }

  clone() {
    return new Board((x,y) => this.cell(x,y).clone());
  }

  cell(x,y) {
    return this.rows[x][y];
  }

  render() {
    let result = '';
    for(let i = 0; i < 9; i++) {
      if (i === 0 || i === 3 || i === 6) {
        result += '<div class="squares">';
      }

      result += '<div class="square">';
      this.square(i).forEach((c, q) => {
        if (q === 0 || q === 3 || q === 6) {
          result += '<div class="cells">';
        }
        result += c.render();
        if (q === 2 || q === 5 || q === 8) {
          result += '</div>';
        }
      });
      result += '</div>';

      if (i === 2 || i === 5 || i === 8) {
        result += '</div>';
      }
    }

    return result;
  }

  row(y) {
    let cells = [];
    for(let x = 0; x < 9; x++) {
      cells.push(this.cell(x,y));
    }

    return cells;
  }

  column(x) {
    let cells = [];
    for(let y = 0; y < 9; y++) {
      cells.push(this.cell(x,y));
    }

    return cells;
  }

  square(s) {
    const boundaries = [
      {x: {min: 0, max: 3}, y: {min: 0, max: 3}},
      {x: {min: 3, max: 6}, y: {min: 0, max: 3}},
      {x: {min: 6, max: 9}, y: {min: 0, max: 3}},

      {x: {min: 0, max: 3}, y: {min: 3, max: 6}},
      {x: {min: 3, max: 6}, y: {min: 3, max: 6}},
      {x: {min: 6, max: 9}, y: {min: 3, max: 6}},

      {x: {min: 0, max: 3}, y: {min: 6, max: 9}},
      {x: {min: 3, max: 6}, y: {min: 6, max: 9}},
      {x: {min: 6, max: 9}, y: {min: 6, max: 9}}
    ];

    const bound = boundaries[s];

    // 0 1 2
    // 3 4 5
    // 6 7 8

    let cells = [];
    for(let y = bound.y.min; y < bound.y.max; y++) {
      for(let x = bound.x.min; x < bound.x.max; x++) {
        cells.push(this.cell(x, y));
      }
    }

    return cells;
  }
}

export default Board;