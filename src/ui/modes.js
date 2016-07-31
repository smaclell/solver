/* eslint no-param-reassign: "off", no-return-assign: "off" */
import arr from './arr';

let choice = 1;
let mode = 'pencil';

const modes = document.getElementsByClassName('mode');
const forEachMode = f => arr.forEach(modes, f);

function toggleMode(e) {
  const target = e.target;
  mode = target.id;

  const selected = 'mode selected';
  const normal = 'mode';
  const modeSelector = m => { m.className = m === target ? selected : normal; };
  forEachMode(modeSelector);
}

export function applyMode(cell) {
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
}

function setupModeButtons() {
  forEachMode(m => {
    m.addEventListener('click', toggleMode);
    if (m.id === mode) {
      m.className = 'mode selected';
    }
  });
}

function changeChoice(e) {
  const previous = document.querySelector(`button[data-choice="${choice}"]`);
  if (previous) {
    previous.className = 'choice';
  }

  const target = e.target;
  choice = parseInt(target.dataset.choice, 10);
  target.className = 'choice selected';
}

function setupModeChoices() {
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

export function setupModes() {
  setupModeButtons();
  setupModeChoices();
}