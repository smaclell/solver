/* eslint no-param-reassign: "off", no-return-assign: "off" */
import arr from './arr.js';

let hover = {};
function applyHover() {
  const cells = document.querySelectorAll('.cell.hover');

  const remove = arr.filter(cells, c => !(c.dataset.x === hover.x || c.dataset.y === hover.y));
  arr.forEach(remove, c => c.className = c.className.replace('hover', ''));

  const selector = `.cell[data-x='${hover.x}'], .cell[data-y='${hover.y}']`;
  const hovers = document.querySelectorAll(selector);
  arr.forEach(hovers, c => {
    const clean = c.className.replace('hover', '');
    c.className = `${clean} hover`;
  });
}

function mouseEnter(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const data = e.target.dataset;
  const x = parseInt(data.x, 10);
  const y = parseInt(data.y, 10);
  const updated = { x, y };

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

export default function setupHover(cell) {
  cell.addEventListener('mouseenter', mouseEnter);
  cell.addEventListener('mouseleave', mouseLeave);
}
