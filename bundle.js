/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__ = __webpack_require__(1);








(function(){

function init(){

     var canvas = document.getElementsByTagName('canvas')[0];
     canvas.width = 1000;
     canvas.height = 700;
     var c = canvas.getContext('2d');
     c.fillStyle = '#4B6BF6';
     c.strokeStyle = '#4B6BF6';
     c.fillRect(0, 0, 1000, 700);


		 const targetAmoeba = new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](400, 400, 40, '#4B6BF6', 1, 1); 
		 const circles = [ targetAmoeba,
		 								 	 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](400, 200, 40, "#37B7C6", -1, 1),
											 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](400, 300, 40, "#A644F3", 1, -1),
											 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](600, 300, 40,"#061CFF", -1, 1),
											 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](700, 400, 40,"#0686FF", -1, -1),
											 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](700, 300, 40,"#6037C6", 1, 1),
											 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](500, 380, 40,"#438FFC", 1, -1),
											 new __WEBPACK_IMPORTED_MODULE_0__amoebas_refactored_amoebas_js__["a" /* default */](300, 400, 40,"#8643FC", 1, 1),

		 ];

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
						//  console.log(circles[i]);

             const currentCircle = circles[i];
            // sqrt((x - x2)^2 + (y - y2)^2)
            // Math.pow(123, 2)


            checkAmoebaforCollisions(currentCircle);
						// checkAmoebaIsOutOfRange(currentCircle);


							currentCircle.x += currentCircle.vx;
							currentCircle.y += currentCircle.vy;

         }

         requestAnimationFrame(draw);
     }
    requestAnimationFrame(draw);
}

//invoke function init once document is fully loaded
window.addEventListener('load',init,false);

}());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Amoeba);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map