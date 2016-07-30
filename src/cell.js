const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Cell {
  constructor() {
    this.value = null;
    this.options = [].concat(numbers);
  }

  clone() {
    const cell = new Cell();
    cell.solved = this.solved;
    cell.value = this.value;
    cell.options = [];

    this.options.forEach(x => cell.options.push(x));

    return cell;
  }

  set(value) {
    this.solved = true;
    this.value = value;
    this.options = [value];
  }

  unset() {
    this.solved = false;
    this.value = undefined;
    this.options = [].concat(numbers);
  }

  remove(value) {
    this.options = this.options.filter(x => x !== value);
  }

  solve() {
    if (this.options.length === 1) {
      this.value = this.options[0];
      this.solved = true;
      return true;
    }
    return false;
  }

  render(x, y) {
    if (this.solved) {
      return `<div class="cell value" data-x="${x}" data-y="${y}">${this.value}</div>`;
    }

    let result = `<div class="cell" data-x="${x}" data-y="${y}">`;

    numbers.forEach(n => {
      if (n === 1 || n === 4 || n === 7) {
        result += '<div class="guesses">';
      }

      let css = 'guess';
      if (!this.options.includes(n)) {
        css += ' taken';
      }
      result += `<div class="${css}">${n}</div>`;

      if (n === 3 || n === 6 || n === 9) {
        result += '</div>';
      }
    });

    result += '</div>';

    return result;
  }
}

export default Cell;
