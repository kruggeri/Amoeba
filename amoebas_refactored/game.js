import Amoeba from './amoebas.js';
import Petri from './petri.js';
const distinctColors = require('distinct-colors');
const chromaJS = require('chroma-js');
const palette = distinctColors();

class Game {
  constructor() {
    this.circles = this.createInitialAmoebas();
    this.targetAmoeba = this.circles[0];
    this.currentScore = 0;
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.drawInitialCanvas();
    this.petri = new Petri();
    this.whiteOutScreen = false;
  }

  createInitialAmoebas() {
    return [
      new Amoeba(400, 400, 40, '#4B6BF6', 1, 1),
      new Amoeba(400, 200, 40, "#37B7C6", -1, 1),
      new Amoeba(400, 300, 40, "#A644F3", 1, -1),
      new Amoeba(600, 300, 40,"#061CFF", -1, 1),
      new Amoeba(700, 400, 40,"#0686FF", -1, -1),
      new Amoeba(700, 300, 40,"#6037C6", 1, 1),
      new Amoeba(500, 380, 40,"#438FFC", 1, -1),
      new Amoeba(300, 400, 40,"#8643FC", 1, 1),
    ];
  }

  drawInitialCanvas() {
    this.canvas.width = 1000;
    this.canvas.height = 775;

    const c = this.canvas.getContext('2d');
    c.fillStyle = '#4B6BF6';
    c.strokeStyle = '#4B6BF6';
    c.fillRect(0, 0, 1000, 700);

    this.updateScore(0);
  }

  updateScore(points) {
    this.currentScore += points;
  }

  drawScore() {
    const c = this.canvas.getContext('2d');
    c.strokeStyle = "black";
    c.fillStyle = "black";
    c.fillRect(0, 700, 1000, 75);
    c.font = "40px Arial";
    c.fillStyle = "white";
    c.fillText(`${this.currentScore}`, 800, 750);
  }

  createNewAmoebaBatch() {
    this.circles = this.createInitialAmoebas();
    this.changeAmoebaColors();
  }

  changeAmoebaColors() {
    const hueMin = Math.floor(Math.random() * 300);
    const hueMax = hueMin + 30;
    let options = {
      count: this.circles.length,
      hueMin: hueMin,
      hueMax: hueMax
    };
    let newPalette = distinctColors(options);

    for (let i = 0; i < newPalette.length; i++) {
      this.circles[i].color = newPalette[i].hex();
    }
    this.targetAmoeba = this.circles[0];
    this.changeBackground(this.circles[0].color);
  }

  drawBackground(ctx) {
    // clear canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //add background back in
    ctx.fillStyle = this.targetAmoeba.color;
    ctx.fillRect(0, 0, 1000, 700);
    ctx.beginPath();
    ctx.arc(500, 350, 250, 0, 2 * Math.PI, true);
    ctx.strokeStyle = "#2C2E37";
    ctx.lineWidth = 40;
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  changeBackground(targetColor) {
    const c = this.canvas.getContext('2d');
    c.fillStyle = targetColor;
    c.strokeStyle = targetColor;
    c.fillRect(0, 0, 1000, 700);
  }

  move() {
    this.circles.forEach((circle) => {
      circle.move(this.petri, this.circles);
    });
  }

  draw() {
    const c = this.canvas.getContext('2d');

    if (this.whiteOutScreen) {
      this.drawWhiteOutScreen();
    } else {
      this.drawBackground(c);
      this.petri.draw(c);
      this.drawScore();
      this.circles.forEach((circle) => {
        circle.draw(c);
      });
    }
  }

  checkForNoAmoebas() {
    if (this.circles.length < 1) {
      this.createNewAmoebaBatch();
    }
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

  handleSuccessfulClick() {
    this.circles.shift();
    this.updateScore(3);
    this.checkForNoAmoebas();
    this.changeAmoebaColors();
  }

  handleFailedClick() {
    this.whiteOutScreen = true;
    setTimeout(() => {
      this.whiteOutScreen = false;
    }, 125);
    this.updateScore(-3);
  }

  drawWhiteOutScreen() {
    const c = this.canvas.getContext('2d');
    c.fillStyle = "#FFFFFF";
    c.strokeStyle = "#FFFFFF";
    c.fillRect(0, 0, 1000, 700);
    c.fill();
  }

  handleClick(event) {
    if (this.didClickOnTarget(event)) {
      this.handleSuccessfulClick();
    } else {
      this.handleFailedClick();
    }
  }

  play() {
    document.addEventListener("click", (event) => {
      this.handleClick(event);
    }, false);
    this.playTurn();
  }

  playTurn() {
    this.checkForNoAmoebas();
    this.move();
    this.draw();

    requestAnimationFrame(() => {
      this.playTurn();
    });
  }
}

export default Game;
