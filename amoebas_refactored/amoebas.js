const DEFAULTS = {
	RADIUS: 40,
	SPEED: [1,1]
};

class Amoeba {
    constructor(x, y, r, color, vx, vy) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = color;
      this.vx = vx;
      this.vy = vy;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true
      );
      ctx.fill();
    }

    move() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
}

export default Amoeba;
