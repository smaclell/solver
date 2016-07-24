import Board from './board';
import reduce from './reducers';

require("./css/style.css");



function createBoard10() {
  var b = new Board();

  b.cell(1,1).set(3);
  b.cell(2,1).set(8);
  b.cell(2,2).set(6);

  b.cell(3,0).set(6);
  b.cell(4,0).set(3);
  b.cell(5,0).set(2);
  b.cell(3,2).set(4);
  b.cell(4,2).set(5);

  b.cell(8,0).set(9);
  b.cell(6,1).set(4);
  b.cell(7,1).set(5);
  b.cell(8,1).set(6);

  b.cell(1,4).set(7);
  b.cell(0,5).set(5);
  b.cell(2,5).set(3);

  b.cell(3,3).set(5);
  b.cell(5,3).set(4);
  b.cell(4,4).set(8);
  b.cell(3,5).set(2);
  b.cell(5,5).set(9);

  b.cell(6,3).set(9);
  b.cell(8,3).set(8);
  b.cell(7,4).set(6);

  b.cell(0,7).set(8);
  b.cell(1,7).set(6);
  b.cell(2,7).set(9);
  b.cell(0,8).set(6);

  b.cell(4,6).set(2);
  b.cell(5,6).set(6);
  b.cell(4,8).set(3);
  b.cell(5,8).set(9);
  b.cell(6,8).set(5);

  b.cell(6,6).set(1);
  b.cell(6,7).set(5);
  b.cell(7,7).set(2);

  return b;
}

function createBoard14() {
  const q = 0;
  const rows = [
    [6, 5, q, 2, q, 8, q, 1, 7],
    [q, q, 9, q, q, q, q, q, 2],
    [8, q, q, 5, q, q, 6, 4, 3],
    [q, 4, q, q, q, 5, 1, q, q],
    [q, 6, q, q, 2, q, q, 7, q],
    [q, q, 8, 1, q, q, q, 2, q],
    [5, 7, 4, q, q, 2, q, q, 6],
    [2, q, q, q, q, q, 7, q, q],
    [9, 8, q, 6, q, 7, q, 3, q]
  ];

  return Board.from(rows, q);
}

function createBoard200() {
  const q = 0;
  const rows = [
    [q, q, q, q, q, 4, 8, q, 1],
    [8, q, 4, q, q, 5, q, 9, q],
    [1, q, q, q, q, q, q, 4, 2],
    [q, q, 6, 1, q, 7, q, q, q],
    [q, 3, q, q, 8, q, q, 6, q],
    [q, q, q, 3, q, 9, 1, q, q],
    [4, 1, q, q, q, q, q, q, 9],
    [q, 9, q, 6, q, q, 2, q, 4],
    [6, q, 3, 4, q, q, q, q, q]
  ];

  return Board.from(rows, q);
}

function render(board) {
  document.getElementById('board').innerHTML = board.render();
}

const pattern = createBoard200;

var b = pattern();
render(b);

document.getElementById('reduce').addEventListener('click', function () {
  window.Board = b = reduce(b);
  render(b);
});

document.getElementById('reset').addEventListener('click', function () {
  window.Board = b = pattern();
  render(b);
});