import { BLACK, WHITE, DEFAULT_FONT, PETRI_COLOR, INITIAL_CANVAS_COLOR } from './style_constants';

export function draw(canvas) {
  const ctx = getContext(canvas);

  if (this.whiteOutScreen) {
    this.drawWhiteOutScreen(ctx);
  } else {
    this.drawBackground(ctx);
    this.petri.draw(ctx);
    this.drawScore(ctx);
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
  ctx.strokeStyle = PETRI_COLOR;
  ctx.lineWidth = 40;
  ctx.stroke();
  ctx.fillStyle = BLACK;
  ctx.fill();
}

export function drawInitialCanvas(canvas) {
  canvas.width = 1000;
  canvas.height = 775;

  const ctx = getContext(canvas);
  ctx.fillStyle = INITAL_CANVAS_COLOR;
  ctx.strokeStyle = INITAL_CANVAS_COLOR;
  ctx.fillRect(0, 0, 1000, 700);

  this.updateScore(0);
}

drawScore(ctx) {
  ctx.strokeStyle = BLACK;
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 700, 1000, 75);
  ctx.font = DEFAULT_FONT;
  ctx.fillStyle = WHITE;
  ctx.fillText(`${this.currentScore}`, 800, 750);
}

drawWhiteOutScreen(ctx) {
  ctx.fillStyle = WHITE;
  ctx.strokeStyle = WHITE;
  ctx.fillRect(0, 0, 1000, 700);
  ctx.fill();
}
