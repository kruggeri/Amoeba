import Amoeba from './amoeba.js';
import Petri from './petri.js';
import DEFAULT_AMOEBAS from './default_amoebas';
import { draw, drawInitialCanvas } from './canvas';

const distinctColors = require('distinct-colors');

class Game {
  constructor() {
    this.circles = DEFAULT_AMOEBAS;
    this.targetAmoeba = this.getTargetAmoeba();
    this.currentScore = 0;
    this.canvas = document.getElementById('canvas');
    drawInitialCanvas(this.canvas);
    this.petri = new Petri();
    this.whiteOutScreen = false;
  }

  getTargetAmoeba() {
    return this.circles[0];
  }

  changeAmoebaColors() {
    const hueMin = Math.floor(Math.random() * 300);
    const hueMax = hueMin + 30;
    let options = {
      count: this.circles.length,
      hueMin,
      hueMax,
    };
    const newPalette = distinctColors(options);

    for (let i = 0; i < newPalette.length; i++) {
      this.circles[i].color = newPalette[i].hex();
    }
    this.targetAmoeba = this.circles[0];
    this.changeBackground(this.circles[0].color);
  }

  changeBackground(targetColor) {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = targetColor;
    ctx.strokeStyle = targetColor;
    ctx.fillRect(0, 0, 1000, 700);
  }

  checkForNoAmoebas() {
    if (this.circles.length < 1) {
      this.createNewAmoebaBatch();
    }
  }

  createNewAmoebaBatch() {
    this.circles = DEFAULT_AMOEBAS;
    this.changeAmoebaColors();
  }

  didClickOnTarget(event) {
    const rect = this.canvas.getBoundingClientRect();
    const xPosition = event.clientX - rect.left;
    const yPosition = event.clientY - rect.top;
    const clickDistance = Math.sqrt(
      Math.pow(xPosition - this.targetAmoeba.x, 2) +
      Math.pow(yPosition - this.targetAmoeba.y, 2)
    );
    return (clickDistance < this.targetAmoeba.r);
  }

  handleClick(event) {
    if (this.didClickOnTarget(event)) {
      this.handleSuccessfulClick();
    } else {
      this.handleFailedClick();
    }
  }

  handleFailedClick() {
    this.whiteOutScreen = true;
    setTimeout(() => {
      this.whiteOutScreen = false;
    }, 125);
    this.updateScore(-3);
  }

  handleSuccessfulClick() {
    this.circles.shift();
    this.updateScore(3);
    this.checkForNoAmoebas();
    this.changeAmoebaColors();
  }

  move() {
    this.circles.forEach((circle) => {
      circle.move(this.petri, this.circles);
    });
  }

  play() {
    document.addEventListener('click', (event) => {
      this.handleClick(event);
    }, false);
    this.playTurn();
  }

  playTurn() {
    this.checkForNoAmoebas();
    this.move();
    draw(this.canvas);

    requestAnimationFrame(() => {
      this.playTurn();
    });
  }

  updateScore(points) {
    this.currentScore += points;
  }
}

export default Game;
