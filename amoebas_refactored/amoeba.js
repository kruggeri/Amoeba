const DEFAULTS = {
	RADIUS: 40,
	SPEED: [1,1],
	MIN_SPEED: 0.25,
	MAX_SPEED: 0.40,
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

	capSpeed() {
    const timesTooFast = this.currentSpeed() / DEFAULTS.MAX_SPEED;

		// if amoeba is too fast, divide by timesTooFast.
    if (this.currentSpeed() > DEFAULTS.MAX_SPEED) {
      this.vx /= timesTooFast;
      this.vy /= timesTooFast;

		// if its too slow, add a little bit to its velocity
    } else if (this.currentSpeed() < DEFAULTS.MIN_SPEED) {
      this.vx += 0.50;
      this.vy += 0.50;
    }
  }

	checkAmoebaforCollisions(petri, amoebas) {
		this.reverseDirectionIfAtPetriEdge(petri);

		amoebas.forEach((amoebaB) => {
			// return when checking itself
			if (amoebaB === this) return;

			if (this.isCollidingWithAmoeba(amoebaB)) {
				this.collideWithAmoeba(amoebaB);
				amoebaB.collideWithAmoeba(this);
			}
		});
	}

	collideWithAmoeba(amoebaB) {
		// handle head on collision
		const collisionDirection = this.isMovingTowardsB(amoebaB) ? -1 : 1;

		[this.vx, this.vy].forEach(dir => {
			dir = dir * collisionDirection * Math.random() + Math.sign(dir) * collisionDirection * 500;
		})

		this.capSpeed();
	}

	currentSpeed() {
		return Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}

	isCollidingWithAmoeba(amoebaB) {
		const distanceToOtherCenter = Math.sqrt(
			Math.pow((this.x - amoebaB.x), 2) +
			Math.pow((this.y - amoebaB.y), 2)
		 );

		 return distanceToOtherCenter <= (this.r + amoebaB.r);
	}

	isMovingTowardsB(amoebaB) {
		const vectorFromAtoB = {
			x: (amoebaB.x - this.x),
			y: (amoebaB.y - this.y)
		};

		const dotProduct = (vectorFromAtoB.x * this.vx) + (vectorFromAtoB.y * this.vy);
		return dotProduct > 0;
	}

	move(petri, amoebas) {
		this.checkAmoebaforCollisions(petri, amoebas);
		this.x += this.vx;
		this.y += this.vy;
	}

	reverseDirectionIfAtPetriEdge(petri) {
		const amoebaCenterDistanceToPetriCenter = Math.sqrt(
			Math.pow((this.x - petri.centerX), 2) +
			Math.pow((this.y - petri.centerY), 2)
		 );

		 if (amoebaCenterDistanceToPetriCenter >= (petri.radius - this.r)) {
			 if (!this.isMovingTowardsB({x: petri.centerX, y: petri.centerY})) {
				 [this.vx, this.vy].forEach(dir => {
					 dir = -(dir * Math.random() + Math.sign(dir) * 0.5);
				 })
			 }
		}
	}
}

export default Amoeba;
