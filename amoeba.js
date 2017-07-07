// const DEFAULTS = {
// 	RADIUS: 40,
// 	SPEED: [1,1]
// };

// class Amoeba {
//     constructor(color, pos) {
//       this.color = color
//       this.pos = pos;
//       this.radius = DEFAULTS.RADIUS;
//       this.vel = DEFAULTS.SPEED;
//     }
//
//     draw(ctx) {
//       ctx.fillStyle = this.color;
//       ctx.arc(
//         this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true
//       );
//       ctx.fill();
//     }
//
//     move() {
//       this.pos[0] += this.vel[0];
//       this.pos[1] += this.vel[1];
//     }
// }


// const amoebaOne = () => new Amoeba("#4B6BF6", [500, 350]);
// const amoebaTwo = () => new Amoeba("#37B7C6", [600, 450]);
// const amoebaThree = () =>  new Amoeba("#A644F3", [650, 350]);
// const amoebaFour = () =>  new Amoeba("#061CFF", [350, 350]);
// const amoebaFive = () =>  new Amoeba("#0686FF", [400, 200]);
// const amoebaSix = () =>  new Amoeba("#E800FF", [600, 200]);
// const amoebaSeven = () =>  new Amoeba("#8643FC", [500, 250]);
// const amoebaEight = () =>  new Amoeba("#438FFC", [500, 550]);
// const amoebaNine = () =>  new Amoeba("#6037C6", [400, 450]);




// function drawAmoebas() {
//
//   const canvasEl = document.getElementById("myCanvas");
//   canvasEl.width = 1000;
//   canvasEl.height = 700;
//   const ctx = canvasEl.getContext("2d");
//
//
//   // clear canvas
//   ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
//
//   //add background back in
//   ctx.fillStyle = "#4B6BF6";
//   ctx.fillRect(0, 0, 1000, 700);
//   ctx.beginPath();
//   ctx.arc(500, 350, 250, 0, 2*Math.PI, true);
//   ctx.strokeStyle = "#2C2E37";
//   ctx.lineWidth = 40;
//   ctx.stroke();
//   ctx.fillStyle = "black";
//   ctx.fill();
//
//   // create amoeba
//
//   ctx.beginPath();
//   ctx.moveTo(500, 175);
//   amoebaOne().draw(ctx);
//
// }

// drawAmoebas();


//TEST VERSION //


//Test Amoeba

// class Amoeba {
//     constructor(x, y, radius, color, vx, vy) {
//       this.color = color
//       this.x = x;
//       this.y = y
//       this.radius = radius;
//       this.vx = vx;
//       this.vy = vy;
//     }
//
//     update() {
//       this.draw();
//     }
//
//     draw(ctx) {
//       ctx.fillStyle = this.color;
//       ctx.arc(
//         this.x, this.y, this.radius, 0, 2*Math.PI, true
//       );
//       ctx.fill();
//       ctx.closePath();
//     }
//
//     move() {
//       this.x += this.vx;
//       this.y += this.vy;
//     }
// }



(function(){

function init(){

     var canvas = document.getElementsByTagName('canvas')[0];
     canvas.width = 1000;
     canvas.height = 700;
     var c = canvas.getContext('2d');
     c.fillStyle = '#4B6BF6';
     c.strokeStyle = '#4B6BF6';
     c.fillRect(0, 0, 1000, 700);


     const circles = [{x:400,y:400,r:40,color: '#4B6BF6',vx:1,vy:1},
                    {x:400,y:200,r:40,color:"#37B7C6",vx:-1,vy:1},
                    {x:400,y:300,r:40,color:"#A644F3",vx:1,vy:-2},
                    {x:600,y:300,r:40,color:"#061CFF",vx:-1,vy:1},
                    {x:700,y:400,r:40,color:"#0686FF",vx:-1,vy:-1},
                    {x:700,y:300,r:40,color:"#6037C6",vx:1,vy:1},
                    {x:500,y:380,r:40,color:"#438FFC",vx:1,vy:-1},
                    {x:300,y:400,r:40,color:"#8643FC",vx:1,vy:1},
                    {x:300,y:400,r:40,color:"#E800FF",vx:1,vy:-1},
     ];

     const petriCenterX = 500;
     const petriCenterY = 350;
     const petriRadius = 250;
     const maxSpeed = 1;
     const minSpeed = 0.5;

    // you have a center at (x, y). And you have a radius of r. And the points (x2, y2) on the edge of the circle are:
    // those where r = sqrt((x - x2)^2 + (y - y2)^2)
    // sqrt((x - x2)^2 + (y - y2)^2) the equation for distance from a point (x, y) to another point (x2, y2)

    function checkAmoebaforCollisions(circleA) {

      const amoebaCenterDistanceToPetriCenter = Math.sqrt(
        Math.pow((circleA.x - petriCenterX), 2) +
        Math.pow((circleA.y - petriCenterY),2)
       );

       if (amoebaCenterDistanceToPetriCenter >= (petriRadius - circleA.r)) {
         if (!isAmovingTowardsB(circleA, {x: petriCenterX, y: petriCenterY})) {
           circleA.vx = - circleA.vx;
           circleA.vy = - circleA.vy;
         }
      }

      circles.forEach( (circleB) => {
        if (circleB === circleA) {
          return;
        }

        const AcenterDistanceToBcenter = Math.sqrt(
          Math.pow((circleA.x - circleB.x), 2) +
          Math.pow((circleA.y - circleB.y),2)
         );

        if (AcenterDistanceToBcenter <= (circleA.r + circleB.r)) {
          const oldCircleAvx = circleA.vx;
          const oldCircleAvy = circleA.vy;
          const speedDecay = 0.75;

          // YOu only flip around if you are headed toward the other person.
          if (isAmovingTowardsB (circleA, circleB)) {
            circleA.vx = -(circleA.vx * speedDecay) + (circleB.vx * speedDecay);
            circleA.vy = -(circleA.vy * speedDecay)+ (circleB.vy * speedDecay);
          } else {
            circleA.vx = (circleA.vx * speedDecay) + (circleB.vx * speedDecay);
            circleA.vy = (circleA.vy * speedDecay)+ (circleB.vy * speedDecay);
          }

          if (isAmovingTowardsB (circleB, circleA)) {
            circleB.vx = -(circleB.vx * speedDecay) + (oldCircleAvx * speedDecay);
            circleB.vy = -(circleB.vy * speedDecay) + (oldCircleAvy * speedDecay);
          } else {
            circleB.vx = (circleB.vx * speedDecay) + (oldCircleAvx * speedDecay);
            circleB.vy = (circleB.vy * speedDecay) + (oldCircleAvy * speedDecay);
          }

          capSpeed(circleA);
          capSpeed(circleB);
        }

      });
    }
// B = (my_pos - your_pos) ||| your_pos + B = my_pos
    function isAmovingTowardsB (amoebaA, amoebaB) {
      // centerA = { x: 300_, y: 200}
      // centerB = { x: 500, y: 100}
      // centerB - centerA = { x: 200, y: -100 }

      const vectorFromAtoB = {
        x: (amoebaB.x - amoebaA.x),
        y: (amoebaB.y - amoebaA.y)
      };

      const dotProduct = (vectorFromAtoB.x * amoebaA.vx) + (vectorFromAtoB.y * amoebaA.vy);
      if (dotProduct > 0) {
        return true;
      } else {
        return false;
      }
    }

    function currentSpeed (vx, vy) {
      return Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    }

    function capSpeed (amoeba) {
      const timesTooFast = Math.max(currentSpeed(amoeba.vx, amoeba.vy) / maxSpeed, 1);
      const timesTooSlow = Math.max(minSpeed / currentSpeed(amoeba.vx, amoeba.vy), 1);



      if (currentSpeed(amoeba.vx, amoeba.vy) > maxSpeed) {
        //clamp it at maxSpeed. Multiply vx and vy by some number so that the
        // speed becomes maxSpeed.
        //
        // timesTooFast = currentSpeed(vx, vy) / maxSpeed
        //
        // Take timesTooFast and use it to divide vx and vy.
        amoeba.vx = amoeba.vx / timesTooFast;
        amoeba.vy = amoeba.vy / timesTooFast;
      } else if (currentSpeed(amoeba.vx, amoeba.vy) < minSpeed) {
        amoeba.vx = amoeba.vx * timesTooSlow;
        amoeba.vy = amoeba.vy * timesTooSlow;
      }
    }

     function draw(){

         c.arc(petriCenterX, petriCenterY, petriRadius, 0, 2*Math.PI, true);
         c.fillStyle = 'black';
         c.strokeStyle = 'black';
         c.fill();

         for(var i=0; i <circles.length; i++){
             c.fillStyle = circles[i].color;
             c.beginPath();
             c.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
             c.fill();

             const currentCircle = circles[i];
            // sqrt((x - x2)^2 + (y - y2)^2)
            // Math.pow(123, 2)

            checkAmoebaforCollisions(currentCircle);
						// checkAmoebaIsOutOfRange(currentCircle);
             circles[i].x +=circles[i].vx;
             circles[i].y +=circles[i].vy;
         }

         requestAnimationFrame(draw);
     }
    requestAnimationFrame(draw);
}

//invoke function init once document is fully loaded
window.addEventListener('load',init,false);

}());
