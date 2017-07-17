
import Amoeba from './amoebas_refactored/amoebas.js';
var distinctColors = require('distinct-colors');
var chromaJS = require('chroma-js');
var palette = distinctColors();


(function(){

  let currentScore = 0;
  let hearts = 3;

function init(){

     var canvas = document.getElementsByTagName('canvas')[0];
     canvas.width = 1000;
     canvas.height = 775;
     var c = canvas.getContext('2d');

     c.fillStyle = '#4B6BF6';
     c.strokeStyle = '#4B6BF6';
     c.fillRect(0, 0, 1000, 700);

     c.strokeStyle = "black";
     c.fillStyle = "black";
     c.fillRect(0, 700, 1000, 75);
     c.font = "40px Arial";
     c.fillStyle = "white";
     c.fillText(`${currentScore}`, 800, 750);





     function initialCircles() {
       return ([         new Amoeba(400, 400, 40, '#4B6BF6', 1, 1),
  		 								 	 new Amoeba(400, 200, 40, "#37B7C6", -1, 1),
  											 new Amoeba(400, 300, 40, "#A644F3", 1, -1),
  											 new Amoeba(600, 300, 40,"#061CFF", -1, 1),
  											 new Amoeba(700, 400, 40,"#0686FF", -1, -1),
  											 new Amoeba(700, 300, 40,"#6037C6", 1, 1),
  											 new Amoeba(500, 380, 40,"#438FFC", 1, -1),
  											 new Amoeba(300, 400, 40,"#8643FC", 1, 1),
  		 ]);
     }

		 let circles = initialCircles();




     let targetAmoeba = circles[0];
     const petriCenterX = 500;
     const petriCenterY = 350;
     const petriRadius = 250;
     const maxSpeed = 0.40;
     const minSpeed = 0.25;

    // you have a center at (x, y). And you have a radius of r. And the points (x2, y2) on the edge of the circle are:
    // those where r = sqrt((x - x2)^2 + (y - y2)^2)
    // sqrt((x - x2)^2 + (y - y2)^2) the equation for distance from a point (x, y) to another point (x2, y2)
		//
		// function checkAmoebaIsOutOfRange(circleA) {
		// 	const amoebaCenterDistanceToPetriCenter = Math.sqrt(
		// 		Math.pow((circleA.x - petriCenterX), 2) +
		// 		Math.pow((circleA.y - petriCenterY),2)
		// 	 );
		//
		// 	if (amoebaCenterDistanceToPetriCenter >= (petriRadius - circleA.r) {
		// 		circleA.x += circles[i].vx;
		// 		circleA.y +=circles[i].vy;
		// 	}
		//
		// }

    // function updateHearts(num) {
    //   hearts += num;
    //
    //   if nums >= 1
    //   c.beginPath();
    //   c.moveTo(75, 40);
    //   c.bezierCurveTo(75, 37, 70, 25, 50, 25);
    //   c.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    //   c.bezierCurveTo(20, 80, 40, 102, 75, 120);
    //   c.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    //   c.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    //   c.bezierCurveTo(85, 25, 75, 37, 75, 40);
    //   c.fillStyle = "white";
    //   c.fill();
    //
    // }


    function updateScore(points) {
      currentScore += points;
      var c = canvas.getContext('2d');
      c.strokeStyle = "black";
      c.fillStyle = "black";
      c.fillRect(0, 700, 1000, 75);
      c.font = "40px Arial";
      c.fillStyle = "white";
      c.fillText(`${currentScore}`, 800, 750);
    }


    function createNewAmoebaBatch() {
      let newCircles = initialCircles();
      changeAmoebaColors(newCircles);
      return newCircles;
    }


    function changeAmoebaColors(circles) {
      const hueMin = Math.floor(Math.random() * (300));
      const hueMax = hueMin + 30;
      let options = { count: circles.length,
                 hueMin: hueMin,
                 hueMax: hueMax
               }
      let newPalette = distinctColors(options);

      for (let i = 0; i < newPalette.length; i++) {
        circles[i].color = newPalette[i].hex();
      }
      targetAmoeba = circles[0];
      changeBackground(circles[0].color);
    }

    function changeBackground(targetColor) {
      var c = canvas.getContext('2d');
      c.fillStyle = targetColor;
      c.strokeStyle = targetColor;
      c.fillRect(0, 0, 1000, 700);
    }


    function checkAmoebaforCollisions(circleA) {

      const amoebaCenterDistanceToPetriCenter = Math.sqrt(
        Math.pow((circleA.x - petriCenterX), 2) +
        Math.pow((circleA.y - petriCenterY),2)
       );

       if (amoebaCenterDistanceToPetriCenter >= (petriRadius - circleA.r)) {
         if (!isAmovingTowardsB(circleA, {x: petriCenterX, y: petriCenterY})) {
           circleA.vx = -(circleA.vx * Math.random() + Math.sign(circleA.vx)*0.5); // F'd
           circleA.vy = -(circleA.vy * Math.random() + Math.sign(circleA.vy)*0.5);

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
            // circleA.vx = -(circleA.vx * speedDecay) + (circleB.vx * speedDecay);
            // circleA.vy = -(circleA.vy * speedDecay)+ (circleB.vy * speedDecay);
						 circleA.vx = -circleA.vx * Math.random() - Math.sign(circleA.vx)*500;
						 circleA.vy = -circleA.vy * Math.random() - Math.sign(circleA.vx)*500;
          } else {
            // circleA.vx = (circleA.vx * speedDecay) + (circleB.vx * speedDecay);
            // circleA.vy = (circleA.vy * speedDecay)+ (circleB.vy * speedDecay);
						circleA.vx = circleA.vx * Math.random() + Math.sign(circleA.vx)*500;
						circleA.vy = circleA.vy * Math.random() + Math.sign(circleA.vx)*500;
          }

          if (isAmovingTowardsB (circleB, circleA)) {
            // circleB.vx = -(circleB.vx * speedDecay) + (oldCircleAvx * speedDecay);
            // circleB.vy = -(circleB.vy * speedDecay) + (oldCircleAvy * speedDecay);
						circleB.vx = -circleB.vx * Math.random() - Math.sign(circleA.vx)*500;
						circleB.vy = -circleB.vy * Math.random() - Math.sign(circleA.vx)*500;
          } else {
            // circleB.vx = (circleB.vx * speedDecay) + (oldCircleAvx * speedDecay);
            // circleB.vy = (circleB.vy * speedDecay) + (oldCircleAvy * speedDecay);
						circleB.vx = circleB.vx * Math.random() + Math.sign(circleA.vx)*500;
						circleB.vy = circleB.vy * Math.random() + Math.sign(circleA.vx)*500;
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

			// if (amoeba.vx > 1) {
			// 	amoeba.vx = 1;
			// } else if (amoeba.vx < -1){
			// 	amoeba.vx = -1
			// }
			//
			// if (amoeba.vy > 1) {
			// 	amoeba.vy = 1;
			// } else if (amoeba.vy < -1){
			// 	amoeba.vy = -1
			// }


      const timesTooFast = currentSpeed(amoeba.vx, amoeba.vy) / maxSpeed;
      const timesTooSlow = minSpeed / currentSpeed(amoeba.vx, amoeba.vy);



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
        amoeba.vx = amoeba.vx + 0.50;
        amoeba.vy = amoeba.vy + 0.50 ;

      }
    }


    function successfulClickPopAnimation(targetAmoeba) {
      // setTimeout( function() {
      //   setInterval( )
      //
      //
      //
      //
      //
      // }, 500);
      let angles = [0, 45, 90, 135, 180, 225, 270, 315];
      let length = targetAmoeba.r;
      var ctx = canvas.getContext('2d');

      // cover up circle before you draw lines
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(targetAmoeba.x,targetAmoeba.y,targetAmoeba.r,0,2*Math.PI,false);
      ctx.fill();

      angles.forEach( angle => {
          let radians = angle / 180 * Math.PI;
          let endX = targetAmoeba.x + length * Math.cos(radians);
          let endY = targetAmoeba.y - length * Math.sin(radians);

          var ctx = canvas.getContext('2d');

          ctx.strokeStyle = targetAmoeba.color;
          ctx.lineWidth = "3";

          ctx.moveTo(targetAmoeba.x, targetAmoeba.y);

          ctx.lineTo(endX, endY);
          ctx.stroke();
          debugger
//
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.arc(targetAmoeba.x,targetAmoeba.y,targetAmoeba.r/2,0,2*Math.PI,false);
          ctx.fill();
        });



  }
    function handleClick(e) {

      var rect = canvas.getBoundingClientRect();
      var xPosition = event.clientX - rect.left;
      var yPosition = event.clientY - rect.top;
      if (Math.sqrt((xPosition-targetAmoeba.x)*(xPosition-targetAmoeba.x) + (yPosition-targetAmoeba.y)*(yPosition-targetAmoeba.y)) < targetAmoeba.r) {
          console.log('circles will be shifted');

          console.log(targetAmoeba);
          var oldTarget = targetAmoeba;
          circles.shift();
          successfulClickPopAnimation(oldTarget);

          updateScore(3);
          changeAmoebaColors(circles);


      } else {

          var c = canvas.getContext('2d');
          var backgroundColor = circles[0].color;
          c.fillStyle = "#FFFFFF";
          c.strokeStyle = "#FFFFFF";
          c.fillRect(0, 0, 1000, 700);

          c.fill();

          setTimeout( function() {
            c.fillStyle = backgroundColor;
            c.strokeStyle = backgroundColor;
            c.fillRect(0, 0, 1000, 700);
          }, 125);
          updateScore(-3);
      }

    }

     function draw(){



         c.arc(petriCenterX, petriCenterY, petriRadius, 0, 2*Math.PI, true);
         c.fillStyle = 'black';
         c.strokeStyle = 'black';
         c.fill();
         document.addEventListener("click", handleClick, false);





         if (circles.length < 1) {
           circles = createNewAmoebaBatch();
         }


         for(var i=0; i < circles.length; i++){
             c.fillStyle = circles[i].color;
             c.beginPath();
             c.arc(circles[i].x,circles[i].y,circles[i].r,0,2*Math.PI,false);
             c.fill();

             const currentCircle = circles[i];
             const targetAmoeba = circles[0];
            // sqrt((x - x2)^2 + (y - y2)^2)
            // Math.pow(123, 2)


            checkAmoebaforCollisions(currentCircle);
						// checkAmoebaIsOutOfRange(currentCircle);

							currentCircle.x += currentCircle.vx;
							currentCircle.y += currentCircle.vy;

              if (currentCircle === targetAmoeba) {
                let targetXpos = targetAmoeba.x;
                let targetYpos = targetAmoeba.y;
              }
         }

         requestAnimationFrame(draw);
     }
    requestAnimationFrame(draw);
}

//invoke function init once document is fully loaded

window.addEventListener('load',init,false);

}());
