import Amoeba from './amoeba.js';
import Petri from './petri.js';
const distinctColors = require('distinct-colors');

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

  changeAmoebaColors() {
    const hueMin = Math.floor(Math.random() * 300);
    const hueMax = hueMin + 30;
    let options = {
      count: this.circles.length,
      hueMin: hueMin,
      hueMax: hueMax
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

  createNewAmoebaBatch() {
    this.circles = this.createInitialAmoebas();
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

  draw() {
    const ctx = this.canvas.getContext('2d');

    if (this.whiteOutScreen) {
      this.drawWhiteOutScreen();
    } else {
      this.drawBackground(ctx);
      this.petri.draw(ctx);
      this.drawScore();
      this.circles.forEach((circle) => {
        circle.draw(ctx);
      });
    }
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

  drawInitialCanvas() {
    this.canvas.width = 1000;
    this.canvas.height = 775;

    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#4B6BF6';
    ctx.strokeStyle = '#4B6BF6';
    ctx.fillRect(0, 0, 1000, 700);

    this.updateScore(0);
  }

  drawScore() {
    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 700, 1000, 75);
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${this.currentScore}`, 800, 750);
  }

  drawWhiteOutScreen() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1000, 700);
    ctx.fill();
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

  updateScore(points) {
    this.currentScore += points;
  }
}

export default Game;
