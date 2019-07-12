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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/slider.js");


const gallerySettings = {
    selector: '#gallery',
    itemSelector:'.gallery-item',
    interval: 3000,
    drag: true,
    callbacks: {
        beforeCreate () { console.log('created') },
        onSLideChange () { console.log('chemged') }
    },
    keyControl: true
}

let NewSlider = new _slider__WEBPACK_IMPORTED_MODULE_0__["Gallery"](gallerySettings);
NewSlider.init();

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/*! exports provided: Gallery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gallery", function() { return Gallery; });
class Gallery {
    constructor(obj) {
        this.params = obj;
        this.slider = document.querySelector(obj.selector);
        this.slides = this.slider.querySelectorAll(obj.itemSelector);
        if(obj.interval){this.interval = obj.interval}else{this.interval = 2000};
        if(obj.autoplay != null){this.autoplay = obj.autoplay}else{this.autoplay = true};
        if(obj.drag != null){this.draggable = obj.drag}else{this.draggable = false};
        if(obj.controls != null){this.controlsOn = obj.controls}else{this.controlsOn = true};
        if(obj.arrows != null){this.arrowsOn = obj.arrows}else{this.arrowsOn = true};
        if(obj.keyControl != null){this.keyControlOn = obj.keyControl}else{this.keyControlOn = false};

        this.slider.style.overflow = 'hidden';
        this.slider.style.position = 'relative';
        this.slider.style.width = '100%';
        this.autoplayDirection = 1;
        this.slider.style.height = screen.height/screen.width*this.slider.clientWidth+'px';
        window.addEventListener('resize', ()=>{
            this.slider.style.height = screen.height/screen.width*this.slider.clientWidth+'px';
        })
        this.activeSlide = 0;
        this.slides[0].classList.add('active');
        this.slideNext = this.slideNext.bind(this);
        this.slidePrev = this.slidePrev.bind(this);

        if(this.keyControlOn){
        this.keyControl = this.keyControl.bind(this);
        this.keyControl();
        }
        
        if(this.arrowsOn){
            this.left = document.createElement('div');
            this.left.classList.add('left');
            this.right = document.createElement('div');
            this.right.classList.add('right');
            this.right.addEventListener('click', this.slideNext);
            this.left.addEventListener('click', this.slidePrev);
            this.slider.appendChild(this.left);
            this.slider.appendChild(this.right);
        }
        this.goToSlide = this.goToSlide.bind(this);
       
        this.init = this.init.bind(this);
        
        
        this.addSwipeListeners = this.addSwipeListeners.bind(this);
        if(this.draggable){
        this.drag = this.drag.bind(this);
        this.drag();
        }

        this.itemOutput = document.createElement('div');
        this.itemOutput.classList.add('item-output');
        this.itemOutput.style.width = 100*this.slides.length+'%';
        
        if (this.controlsOn){
        this.controls = document.createElement('div');
        this.controls.classList.add('controls');
        this.controls.setAttribute('data-slider', obj.selector);}
        
        for (let i=0; i < this.slides.length; i++){
            this.slides[i].style.width = (100/this.slides.length)+'%';
            this.slides[i].classList.add('slide-item');
            if(this.slides[i].querySelector('img')){
            let img = this.slides[i].querySelector('img');
            let src = img.getAttribute('src');
            this.slides[i].style.backgroundImage = `url('${src}') `;
            this.slides[i].style.backgroundSize = 'cover';
            this.slides[i].style.backgroundPosition = 'center';
            img.remove();};           
            if (this.controlsOn){
                let controlElem = document.createElement('div');
                controlElem.classList.add('control-element');
                controlElem.setAttribute('data-slide', i);
                this.controls.appendChild(controlElem);
            }
            
            this.itemOutput.appendChild(this.slides[i]);
        }
        
        this.slider.appendChild(this.itemOutput);
        
        if (this.controlsOn){
             this.slider.appendChild(this.controls);
        }
        
        this.drag = new DragEvent(this.selector)
        this.controls.addEventListener('click', (e)=>{
            if(e.target.dataset.slide){
            this.goToSlide(e.target.dataset.slide)
            }
        } )
    }

    addSwipeListeners() {
       let detecting = false, x, delta, newX, started = false;
        this.addEventListener('touchstart', (e)=>{
            if (e.touches.length != 1 || started){
                return;}
                detecting = true;
                let touch = e.changedTouches[0];
                x = touch.pageX;
                started = true;
        })

        this.addEventListener('touchmove', (e)=>{
            if (!started && !detecting){
                return;
            }
            let touch = e.changedTouches[0];
                newX = touch.pageX;
                delta = x-newX;
            

        })
        
        this.addEventListener('touchend', (e)=>{
            if (e.changedTouches.indexOf(touch) == -1 || !started){
                return;
            }
            e.preventDefault();
            delta>0?this.slideNext():this.slidePrev()

        })
    
    }


    slideNext (){
        if(this.activeSlide<this.slides.length-1){
        this.activeSlide++;
        this.itemOutput.style.transform = `translateX(${-100*this.activeSlide/this.slides.length}%)`}
    }

    slidePrev() {
        if(this.activeSlide>0){
            this.activeSlide--;
            this.itemOutput.style.transform = `translateX(${-100*this.activeSlide/this.slides.length}%)`}
    }

    goToSlide(index) {
        this.activeSlide = index;
        this.itemOutput.style.transform = `translateX(${-100*this.activeSlide/this.slides.length}%)`
    }

    destroy() {
        this.remove();
    }

    drag(){
        if (this.draggable){
            let x, delta, newX, started = false;
            this.slider.addEventListener('mousedown', (e)=>{
                e.preventDefault();
                     let touch = e;
                     x = touch.pageX;
                     started = true;
            }); 

            this.slider.addEventListener('mousemove', (e)=>{
                e.preventDefault();
                if(started){
                    let touch = e;
                    newX = touch.pageX;
                    delta = x-newX;
                    if((delta>0&&this.activeSlide<this.slides.length-1)||(delta<0&&this.activeSlide>0)){
                        this.itemOutput.style.transition = 'none';
                        this.itemOutput.style.transform = `translateX(${-100*this.activeSlide/this.slides.length-delta*100/(this.slider.clientWidth*this.slides.length)}%)`
                                    }
                    }
            });
                     
            this.slider.addEventListener('mouseup', (e)=>{
                e.preventDefault();
                let touch = e;
                newX = touch.pageX;
                delta = x-newX;
                this.itemOutput.style.transition = 'all 1s ease-in-out';
                if (Math.abs(delta)>50){delta>0?this.slideNext():this.slidePrev()}
                started = false;
     
             });
             this.slider.addEventListener('mouseout', (e)=>{
                e.preventDefault();
                if(started){
                this.itemOutput.style.transition = 'all 1s ease-in-out';
                if (Math.abs(delta)>50){delta>0?this.slideNext():this.slidePrev()}else{this.goToSlide(this.activeSlide)}
                started = false;
                }
     
             });

             this.slider.addEventListener('contextmenu', (e)=>{
                e.preventDefault();
             })  
        }      
    }

    init() {
        if (this.autoplay){
            this.autoplayIterval = setInterval(()=>{
                if(this.autoplayDirection == 1){
                    this.slideNext();
                    if (this.activeSlide==this.slides.length-1){
                        this.autoplayDirection = -1
                    }
                }else{
                    this.slidePrev();
                    if (this.activeSlide==0){
                        this.autoplayDirection = 1;
                    }
                }
            }, this.interval);
        }
    }

    keyControl(){
        
        document.body.addEventListener('keydown', (e)=>{
            if(e.keyCode==39){this.slideNext()};
            if(e.keyCode==37){this.slidePrev()};
        });
    }

}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUJBQXlCO0FBQ2xELDBCQUEwQjtBQUMxQixLQUFLO0FBQ0w7QUFDQTs7QUFFQSxvQkFBb0IsK0NBQU87QUFDM0IsaUI7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDZCQUE2QixLQUFLO0FBQzNELGlDQUFpQyw2QkFBNkIsS0FBSztBQUNuRSw2QkFBNkIsMEJBQTBCLEtBQUs7QUFDNUQsaUNBQWlDLCtCQUErQixLQUFLO0FBQ3JFLCtCQUErQiwyQkFBMkIsS0FBSztBQUMvRCxtQ0FBbUMsbUNBQW1DLEtBQUs7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQix3QkFBd0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxJQUFJO0FBQy9EO0FBQ0E7QUFDQSwyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5Q0FBeUM7QUFDakc7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTRELHlDQUF5QztBQUNyRzs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELHlDQUF5QztBQUNqRzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsRTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLGdHQUFnRztBQUN4SztBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLDBDQUEwQyxLQUFLO0FBQ3ZGO0FBQ0E7O0FBRUEsY0FBYzs7QUFFZDtBQUNBO0FBQ0EsY0FBYztBQUNkLFM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUIsU0FBUztBQUNUOztBQUVBLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBHYWxsZXJ5IH0gZnJvbSAnLi9zbGlkZXInO1xyXG5cclxuY29uc3QgZ2FsbGVyeVNldHRpbmdzID0ge1xyXG4gICAgc2VsZWN0b3I6ICcjZ2FsbGVyeScsXHJcbiAgICBpdGVtU2VsZWN0b3I6Jy5nYWxsZXJ5LWl0ZW0nLFxyXG4gICAgaW50ZXJ2YWw6IDMwMDAsXHJcbiAgICBkcmFnOiB0cnVlLFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgYmVmb3JlQ3JlYXRlICgpIHsgY29uc29sZS5sb2coJ2NyZWF0ZWQnKSB9LFxyXG4gICAgICAgIG9uU0xpZGVDaGFuZ2UgKCkgeyBjb25zb2xlLmxvZygnY2hlbWdlZCcpIH1cclxuICAgIH0sXHJcbiAgICBrZXlDb250cm9sOiB0cnVlXHJcbn1cclxuXHJcbmxldCBOZXdTbGlkZXIgPSBuZXcgR2FsbGVyeShnYWxsZXJ5U2V0dGluZ3MpO1xyXG5OZXdTbGlkZXIuaW5pdCgpOyIsImV4cG9ydCBjbGFzcyBHYWxsZXJ5IHtcclxuICAgIGNvbnN0cnVjdG9yKG9iaikge1xyXG4gICAgICAgIHRoaXMucGFyYW1zID0gb2JqO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvYmouc2VsZWN0b3IpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzID0gdGhpcy5zbGlkZXIucXVlcnlTZWxlY3RvckFsbChvYmouaXRlbVNlbGVjdG9yKTtcclxuICAgICAgICBpZihvYmouaW50ZXJ2YWwpe3RoaXMuaW50ZXJ2YWwgPSBvYmouaW50ZXJ2YWx9ZWxzZXt0aGlzLmludGVydmFsID0gMjAwMH07XHJcbiAgICAgICAgaWYob2JqLmF1dG9wbGF5ICE9IG51bGwpe3RoaXMuYXV0b3BsYXkgPSBvYmouYXV0b3BsYXl9ZWxzZXt0aGlzLmF1dG9wbGF5ID0gdHJ1ZX07XHJcbiAgICAgICAgaWYob2JqLmRyYWcgIT0gbnVsbCl7dGhpcy5kcmFnZ2FibGUgPSBvYmouZHJhZ31lbHNle3RoaXMuZHJhZ2dhYmxlID0gZmFsc2V9O1xyXG4gICAgICAgIGlmKG9iai5jb250cm9scyAhPSBudWxsKXt0aGlzLmNvbnRyb2xzT24gPSBvYmouY29udHJvbHN9ZWxzZXt0aGlzLmNvbnRyb2xzT24gPSB0cnVlfTtcclxuICAgICAgICBpZihvYmouYXJyb3dzICE9IG51bGwpe3RoaXMuYXJyb3dzT24gPSBvYmouYXJyb3dzfWVsc2V7dGhpcy5hcnJvd3NPbiA9IHRydWV9O1xyXG4gICAgICAgIGlmKG9iai5rZXlDb250cm9sICE9IG51bGwpe3RoaXMua2V5Q29udHJvbE9uID0gb2JqLmtleUNvbnRyb2x9ZWxzZXt0aGlzLmtleUNvbnRyb2xPbiA9IGZhbHNlfTtcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodC9zY3JlZW4ud2lkdGgqdGhpcy5zbGlkZXIuY2xpZW50V2lkdGgrJ3B4JztcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodC9zY3JlZW4ud2lkdGgqdGhpcy5zbGlkZXIuY2xpZW50V2lkdGgrJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVOZXh0ID0gdGhpcy5zbGlkZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNsaWRlUHJldiA9IHRoaXMuc2xpZGVQcmV2LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMua2V5Q29udHJvbE9uKXtcclxuICAgICAgICB0aGlzLmtleUNvbnRyb2wgPSB0aGlzLmtleUNvbnRyb2wuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmtleUNvbnRyb2woKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5hcnJvd3NPbil7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQuY2xhc3NMaXN0LmFkZCgnbGVmdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQuY2xhc3NMaXN0LmFkZCgncmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2xpZGVOZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zbGlkZVByZXYpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmxlZnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnJpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nb1RvU2xpZGUgPSB0aGlzLmdvVG9TbGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0ID0gdGhpcy5pbml0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTd2lwZUxpc3RlbmVycyA9IHRoaXMuYWRkU3dpcGVMaXN0ZW5lcnMuYmluZCh0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmRyYWdnYWJsZSl7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdGhpcy5kcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kcmFnKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuY2xhc3NMaXN0LmFkZCgnaXRlbS1vdXRwdXQnKTtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUud2lkdGggPSAxMDAqdGhpcy5zbGlkZXMubGVuZ3RoKyclJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sc09uKXtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5jbGFzc0xpc3QuYWRkKCdjb250cm9scycpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbHMuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlcicsIG9iai5zZWxlY3Rvcik7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUud2lkdGggPSAoMTAwL3RoaXMuc2xpZGVzLmxlbmd0aCkrJyUnO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKXtcclxuICAgICAgICAgICAgbGV0IGltZyA9IHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBsZXQgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7c3JjfScpIGA7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XHJcbiAgICAgICAgICAgIGltZy5yZW1vdmUoKTt9OyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xzT24pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sRWxlbS5jbGFzc0xpc3QuYWRkKCdjb250cm9sLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9scy5hcHBlbmRDaGlsZChjb250cm9sRWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuaXRlbU91dHB1dCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHNPbil7XHJcbiAgICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kcmFnID0gbmV3IERyYWdFdmVudCh0aGlzLnNlbGVjdG9yKVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC5zbGlkZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ub1NsaWRlKGUudGFyZ2V0LmRhdGFzZXQuc2xpZGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IClcclxuICAgIH1cclxuXHJcbiAgICBhZGRTd2lwZUxpc3RlbmVycygpIHtcclxuICAgICAgIGxldCBkZXRlY3RpbmcgPSBmYWxzZSwgeCwgZGVsdGEsIG5ld1gsIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSk9PntcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggIT0gMSB8fCBzdGFydGVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjt9XHJcbiAgICAgICAgICAgICAgICBkZXRlY3RpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIHggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpPT57XHJcbiAgICAgICAgICAgIGlmICghc3RhcnRlZCAmJiAhZGV0ZWN0aW5nKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSB4LW5ld1g7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSk9PntcclxuICAgICAgICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMuaW5kZXhPZih0b3VjaCkgPT0gLTEgfHwgIXN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZGVsdGE+MD90aGlzLnNsaWRlTmV4dCgpOnRoaXMuc2xpZGVQcmV2KClcclxuXHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzbGlkZU5leHQgKCl7XHJcbiAgICAgICAgaWYodGhpcy5hY3RpdmVTbGlkZTx0aGlzLnNsaWRlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSsrO1xyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAqdGhpcy5hY3RpdmVTbGlkZS90aGlzLnNsaWRlcy5sZW5ndGh9JSlgfVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUHJldigpIHtcclxuICAgICAgICBpZih0aGlzLmFjdGl2ZVNsaWRlPjApe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLS07XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAqdGhpcy5hY3RpdmVTbGlkZS90aGlzLnNsaWRlcy5sZW5ndGh9JSlgfVxyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TbGlkZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBpbmRleDtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstMTAwKnRoaXMuYWN0aXZlU2xpZGUvdGhpcy5zbGlkZXMubGVuZ3RofSUpYFxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKXtcclxuICAgICAgICAgICAgbGV0IHgsIGRlbHRhLCBuZXdYLCBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICBsZXQgdG91Y2ggPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgICB4ID0gdG91Y2gucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTsgXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSk9PntcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0geC1uZXdYO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKChkZWx0YT4wJiZ0aGlzLmFjdGl2ZVNsaWRlPHRoaXMuc2xpZGVzLmxlbmd0aC0xKXx8KGRlbHRhPDAmJnRoaXMuYWN0aXZlU2xpZGU+MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCp0aGlzLmFjdGl2ZVNsaWRlL3RoaXMuc2xpZGVzLmxlbmd0aC1kZWx0YSoxMDAvKHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoKnRoaXMuc2xpZGVzLmxlbmd0aCl9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZTtcclxuICAgICAgICAgICAgICAgIG5ld1ggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0geC1uZXdYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzIGVhc2UtaW4tb3V0JztcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YSk+NTApe2RlbHRhPjA/dGhpcy5zbGlkZU5leHQoKTp0aGlzLnNsaWRlUHJldigpfVxyXG4gICAgICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgIFxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgZWFzZS1pbi1vdXQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKT41MCl7ZGVsdGE+MD90aGlzLnNsaWRlTmV4dCgpOnRoaXMuc2xpZGVQcmV2KCl9ZWxzZXt0aGlzLmdvVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlKX1cclxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICBcclxuICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpPT57XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICB9KSAgXHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpe1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9wbGF5SXRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9wbGF5RGlyZWN0aW9uID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlU2xpZGU9PXRoaXMuc2xpZGVzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZVByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b3BsYXlEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGtleUNvbnRyb2woKXtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSk9PntcclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlPT0zOSl7dGhpcy5zbGlkZU5leHQoKX07XHJcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZT09Mzcpe3RoaXMuc2xpZGVQcmV2KCl9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiIn0=