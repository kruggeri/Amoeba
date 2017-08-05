import Amoeba from './amoebas.js';
const distinctColors = require('distinct-colors');
const chromaJS = require('chroma-js');
const palette = distinctColors();

class Game {
  constructor() {
    this.circles = this.createInitialAmoebas();
    this.targetAmoeba = this.circles[0];
    this.currentScore = 0;
    this.canvas = document.getElementsByTagName('canvas')[0];
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


  createInitialCanvas() {
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
    const c = this.canvas.getContext('2d');
    c.strokeStyle = "black";
    c.fillStyle = "black";
    c.fillRect(0, 700, 1000, 75);
    c.font = "40px Arial";
    c.fillStyle = "white";
    c.fillText(`${this.currentScore}`, 800, 750);
  }

  createNewAmoebaBatch() {
    let newCircles = this.createInitialAmoebas();
    this.changeAmoebaColors(newCircles);
    return newCircles;
  }

  changeAmoebaColors(circles) {
    const hueMin = Math.floor(Math.random() * 300);
    const hueMax = hueMin + 30;
    let options = {
      count: circles.length,
      hueMin: hueMin,
      hueMax: hueMax
    };
    let newPalette = distinctColors(options);

    for (let i = 0; i < newPalette.length; i++) {
      circles[i].color = newPalette[i].hex();
    }
    this.targetAmoeba = circles[0];
    this.changeBackground(circles[0].color);
  }

  changeBackground(targetColor) {
    const c = this.canvas.getContext('2d');
    c.fillStyle = targetColor;
    c.strokeStyle = targetColor;
    c.fillRect(0, 0, 1000, 700);
  }
  
}

export default Game;
