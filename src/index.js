import Board from './board';
import reduce from './reducers';

require('./css/style.css');



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

function createBoard422() {
  const q = 0;
  const rows = [
    [q, 7, q, q, 8, q, q, q, 5],
    [q, 8, q, q, q, 5, q, q, 9],
    [q, q, 5, q, q, 1, q, 6, q],
    [q, q, q, q, 2, 7, q, q, 6],
    [q, 3, q, 5, q, 8, q, 1, q],
    [7, q, q, 4, 1, q, q, q, q],
    [q, 9, q, 1, q, q, 4, q, q],
    [3, q, q, 8, q, q, q, 7, q],
    [8, q, q, q, 7, q, q, 2, q]
  ];

  return Board.from(rows, q);
}

let methods = {};
const addMethod = m => methods[m] = (t, f) => Array.prototype[m].call(t, f);
['forEach', 'filter'].forEach(m => addMethod(m));

let choice = 1;
let mode = 'pencil';

function clickCell(e) {
  let c = e.target;
  while((c.className || '').indexOf('cell') === -1) {
    c = c.parentElement;
  }

  if (!c) {
    return;
  }

  const x = parseInt(c.dataset.x, 10);
  const y = parseInt(c.dataset.y, 10);

  const cell = window.Board.cell(x, y);

  if (mode === 'pencil') {
    if (cell.options.indexOf(choice) >= 0) {
      cell.options = cell.options.filter(o => o !== choice);
    } else {
      cell.options.push(choice);
    }
  } else {
    if (cell.value === choice) {
      cell.unset();
    } else {
      cell.set(choice);
    }
  }

  render(window.Board);
}

let hover = {};
function applyHover() {
  const cells = document.querySelectorAll('.cell.hover');

  const remove = methods.filter(cells, c => !(c.dataset.x === hover.x || c.dataset.y === hover.y));
  methods.forEach(remove, c => c.className = c.className.replace('hover', ''));

  const hovers = document.querySelectorAll(`.cell[data-x='${hover.x}'], .cell[data-y='${hover.y}']`);
  methods.forEach(hovers, c => c.className = c.className.replace('hover', '') + ' hover');
}

function mouseEnter(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const x = parseInt(e.target.dataset.x, 10);
  const y = parseInt(e.target.dataset.y, 10);
  const updated = {x, y};

  if (!updated.x || !updated.y) {
    return false;
  }

  hover = updated;
  applyHover();

  return false;
}

function mouseLeave(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  applyHover();
  return false;
}

function render(board) {
  document.getElementById('board').innerHTML = board.render();

  const cells = document.getElementsByClassName('cell');
  methods.forEach(cells, c => {
    c.addEventListener('click', clickCell);
    c.addEventListener('mouseenter', mouseEnter);
    c.addEventListener('mouseleave', mouseLeave);
  });
}

const pattern = createBoard422;

let b = pattern();
render(b);

window.Board = b;

function evaluate() {
  window.Board = b = reduce(b);
  render(b);
}

function toggleButtons(enabled = true) {
  const buttons = document.getElementsByTagName('button');

  const filtered = methods.filter(buttons, button => button.className != 'choice');
  methods.forEach(filtered, button => button.disabled = enabled ? '' : 'disabled');
}

function disableButtonsWhile(func) {
  toggleButtons(false);
  func();
  toggleButtons(true);
}

document.getElementById('validate').addEventListener('click', function () {
  let valid = true;

  const check = cells => {
    let remaining = {};
    cells.filter(c => c.solved).forEach(c => {
      c.options.forEach(v => {
        const found = remaining[v]
        if (found) {
          valid = false;
        }
        remaining[v] = true;
      });
    });
  };

  for(let i = 0; i < 9; i++) {
    check(window.Board.column(i));
    check(window.Board.row(i));
    check(window.Board.square(i));
  }

  if (!valid) {
    alert("INVALID");
  }
});

document.getElementById('reduce').addEventListener('click', function () {
  disableButtonsWhile(evaluate);
});

document.getElementById('reset').addEventListener('click', function () {
  window.Board = b = pattern();
  disableButtonsWhile(evaluate);
});

const modes = document.getElementsByClassName('mode');
const forEachMode = f => methods.forEach(modes, f);

function toggleMode(e) {
  const target = e.target;
  mode = target.id;

  const modeSelector = m => m.className = m === target ? 'mode selected' : 'mode';
  forEachMode(modeSelector);
}

function setupModes() {
  forEachMode(m => {
    m.addEventListener('click', toggleMode);
    if (m.id === mode) {
      m.className = 'mode selected';
    }
  });
}

function changeChoice(e) {
  const previous = document.querySelector('button[data-choice="' + choice + '"]');
  if (previous) {
    previous.className = 'choice';
  }

  const target = e.target;
  choice = parseInt(target.dataset.choice, 10);
  target.className = 'choice selected';
}

function setupChoices() {
  const choices = document.getElementById('choices');
  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(c => {
    const e = document.createElement('button');
    e.className = 'choice';
    if (choice === c) {
      e.className += ' selected';
    }

    e.dataset.choice = c;
    e.innerText = c.toString();

    e.addEventListener('click', changeChoice);
    choices.appendChild(e);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  setupChoices();
  setupModes();
});