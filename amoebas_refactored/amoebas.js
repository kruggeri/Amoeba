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

		reverseDirectionIfAtPetriEdge(petri) {
			const amoebaCenterDistanceToPetriCenter = Math.sqrt(
				Math.pow((this.x - petri.centerX), 2) +
				Math.pow((this.y - petri.centerY), 2)
			 );

			 if (amoebaCenterDistanceToPetriCenter >= (petri.radius - this.r)) {
				 if (!this.isMovingTowardsB({x: petri.centerX, y: petri.centerY})) {
					 this.vx = -(this.vx * Math.random() + Math.sign(this.vx) * 0.5);
					 this.vy = -(this.vy * Math.random() + Math.sign(this.vy) * 0.5);
				 }
			}
		}

		isCollidingWithAmoeba(amoebaB) {
			const distanceToOtherCenter = Math.sqrt(
				Math.pow((this.x - amoebaB.x), 2) +
				Math.pow((this.y - amoebaB.y), 2)
			 );

			 return distanceToOtherCenter <= (this.r + amoebaB.r);
		}

		collideWithAmoeba(amoebaB) {
			if (this.isMovingTowardsB(amoebaB)) {
				// handle head on collision
				 this.vx = -this.vx * Math.random() - Math.sign(this.vx) * 500;
				 this.vy = -this.vy * Math.random() - Math.sign(this.vx) * 500;
			} else {
				// handle rear end collision
				this.vx = this.vx * Math.random() + Math.sign(this.vx) * 500;
				this.vy = this.vy * Math.random() + Math.sign(this.vx) * 500;
			}
			this.capSpeed();
		}

		isMovingTowardsB(amoebaB) {
			const vectorFromAtoB = {
				x: (amoebaB.x - this.x),
				y: (amoebaB.y - this.y)
			};

			const dotProduct = (vectorFromAtoB.x * this.vx) + (vectorFromAtoB.y * this.vy);
			return dotProduct > 0;
		}

		currentSpeed() {
			return Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
		}

		capSpeed() {
      const timesTooFast = this.currentSpeed() / DEFAULTS.MAX_SPEED;
      if (this.currentSpeed() > DEFAULTS.MAX_SPEED) {
				// if amoeba is too fast, divide by timesTooFast.
        this.vx = this.vx / timesTooFast;
        this.vy = this.vy / timesTooFast;
      } else if (this.currentSpeed() < DEFAULTS.MIN_SPEED) {
				// if its too slow, add a little bit to its velocity
        this.vx = this.vx + 0.50;
        this.vy = this.vy + 0.50;
      }
    }

		checkAmoebaforCollisions(petri, amoebas) {
			this.reverseDirectionIfAtPetriEdge(petri);

			amoebas.forEach((amoebaB) => {
				if (amoebaB === this) {
					return;
				}

				if (this.isCollidingWithAmoeba(amoebaB)) {
					this.collideWithAmoeba(amoebaB);
					amoebaB.collideWithAmoeba(this);
				}
			});
		}

		draw(ctx) {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.closePath();
		}

		move(petri, amoebas) {
			this.checkAmoebaforCollisions(petri, amoebas);
			this.x += this.vx;
			this.y += this.vy;
		}
}

export default Amoeba;
