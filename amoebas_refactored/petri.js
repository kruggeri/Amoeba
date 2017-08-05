class Petri {

  constructor() {
    this.centerX = 500;
    this.centerY = 350;
    this.radius = 250;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius + 40, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#2A2A2A';
    ctx.fill();
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#2A2A2A';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
}

export default Petri;
