/* eslint no-param-reassign: "off", no-return-assign: "off" */
import * as boards from './boards';
import arr from './ui/arr';
import setupHover from './ui/hover';
import { applyMode, setupModes } from './ui/modes';
import reduce from './reducers';

require('./css/style.css');

const pattern = boards.createBoard200;

let board = pattern();

function clickCell(e) {
  let c = e.target;
  while ((c.className || '').indexOf('cell') === -1) {
    c = c.parentElement;
  }

  if (!c) {
    return;
  }

  const x = parseInt(c.dataset.x, 10);
  const y = parseInt(c.dataset.y, 10);

  const cell = board.cell(x, y);
  applyMode(cell);

  render(); // eslint-disable-line no-use-before-define
}

function render() {
  document.getElementById('board').innerHTML = board.render();

  const cells = document.getElementsByClassName('cell');
  arr.forEach(cells, c => {
    c.addEventListener('click', clickCell);
    setupHover(c);
  });
}

document.getElementById('validate').addEventListener('click', () => {
  if (!board.isValid()) {
    alert('INVALID'); // eslint-disable-line no-alert
  }
});

document.getElementById('reduce').addEventListener('click', () => {
  board = reduce(board);
  render();
});

document.getElementById('reset').addEventListener('click', () => {
  board = pattern();
  render();
});

document.addEventListener('DOMContentLoaded', () => {
  render();
  setupModes();
});
