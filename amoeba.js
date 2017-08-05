
import Amoeba from './amoebas_refactored/amoebas.js';
var distinctColors = require('distinct-colors');
var chromaJS = require('chroma-js');
var palette = distinctColors();


(function(){

  let currentScore = 0;
  let hearts = 3;


function init(){

//     function successfulClickPopAnimation(targetAmoeba) {
//       // setTimeout( function() {
//       //   setInterval( )
//       //
//       //
//       //
//       //
//       //
//       // }, 500);
//       let angles = [0, 45, 90, 135, 180, 225, 270, 315];
//       let length = targetAmoeba.r;
//       var ctx = canvas.getContext('2d');
//
//       // cover up circle before you draw lines
//       ctx.fillStyle = "#000000";
//       ctx.beginPath();
//       ctx.arc(targetAmoeba.x,targetAmoeba.y,targetAmoeba.r,0,2*Math.PI,false);
//       ctx.fill();
//
//       angles.forEach( angle => {
//           let radians = angle / 180 * Math.PI;
//           let endX = targetAmoeba.x + length * Math.cos(radians);
//           let endY = targetAmoeba.y - length * Math.sin(radians);
//
//           var ctx = canvas.getContext('2d');
//
//           ctx.strokeStyle = targetAmoeba.color;
//           ctx.lineWidth = "3";
//
//           ctx.moveTo(targetAmoeba.x, targetAmoeba.y);
//
//           ctx.lineTo(endX, endY);
//           ctx.stroke();
//           debugger
// //
//           ctx.fillStyle = "#000000";
//           ctx.beginPath();
//           ctx.arc(targetAmoeba.x,targetAmoeba.y,targetAmoeba.r/2,0,2*Math.PI,false);
//           ctx.fill();
//         });
//
//
//
//   }
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
       petri.draw();
         document.addEventListener("click", handleClick, false);

         if (circles.length < 1) {
           circles = createNewAmoebaBatch();
         }


         circles.forEach((circle) => {
           circle.draw(ctx);
           circle.move(petri, circles);
         });

         requestAnimationFrame(draw);
     }
    requestAnimationFrame(draw);
}

//invoke function init once document is fully loaded

window.addEventListener('load',init,false);

}());
