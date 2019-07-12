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

        if (obj.callback){
            for(let funct in callback){
                this.callback[funct] = obj.callback[funct];
                console.log (this.callback);
                        }
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUJBQXlCO0FBQ2xELDBCQUEwQjtBQUMxQixLQUFLO0FBQ0w7QUFDQTs7QUFFQSxvQkFBb0IsK0NBQU87QUFDM0IsaUI7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDZCQUE2QixLQUFLO0FBQzNELGlDQUFpQyw2QkFBNkIsS0FBSztBQUNuRSw2QkFBNkIsMEJBQTBCLEtBQUs7QUFDNUQsaUNBQWlDLCtCQUErQixLQUFLO0FBQ3JFLCtCQUErQiwyQkFBMkIsS0FBSztBQUMvRCxtQ0FBbUMsbUNBQW1DLEtBQUs7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsSUFBSTtBQUMvRDtBQUNBO0FBQ0EsMkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QseUNBQXlDO0FBQ2pHOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCx5Q0FBeUM7QUFDckc7O0FBRUE7QUFDQTtBQUNBLHdEQUF3RCx5Q0FBeUM7QUFDakc7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxnR0FBZ0c7QUFDeEs7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywwQ0FBMEMsS0FBSztBQUN2RjtBQUNBOztBQUVBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBLGNBQWM7QUFDZCxTO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCLFNBQVM7QUFDVDs7QUFFQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4vc2xpZGVyJztcclxuXHJcbmNvbnN0IGdhbGxlcnlTZXR0aW5ncyA9IHtcclxuICAgIHNlbGVjdG9yOiAnI2dhbGxlcnknLFxyXG4gICAgaXRlbVNlbGVjdG9yOicuZ2FsbGVyeS1pdGVtJyxcclxuICAgIGludGVydmFsOiAzMDAwLFxyXG4gICAgZHJhZzogdHJ1ZSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIGJlZm9yZUNyZWF0ZSAoKSB7IGNvbnNvbGUubG9nKCdjcmVhdGVkJykgfSxcclxuICAgICAgICBvblNMaWRlQ2hhbmdlICgpIHsgY29uc29sZS5sb2coJ2NoZW1nZWQnKSB9XHJcbiAgICB9LFxyXG4gICAga2V5Q29udHJvbDogdHJ1ZVxyXG59XHJcblxyXG5sZXQgTmV3U2xpZGVyID0gbmV3IEdhbGxlcnkoZ2FsbGVyeVNldHRpbmdzKTtcclxuTmV3U2xpZGVyLmluaXQoKTsiLCJleHBvcnQgY2xhc3MgR2FsbGVyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmopIHtcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IG9iajtcclxuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob2JqLnNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLnNsaWRlcyA9IHRoaXMuc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwob2JqLml0ZW1TZWxlY3Rvcik7XHJcbiAgICAgICAgaWYob2JqLmludGVydmFsKXt0aGlzLmludGVydmFsID0gb2JqLmludGVydmFsfWVsc2V7dGhpcy5pbnRlcnZhbCA9IDIwMDB9O1xyXG4gICAgICAgIGlmKG9iai5hdXRvcGxheSAhPSBudWxsKXt0aGlzLmF1dG9wbGF5ID0gb2JqLmF1dG9wbGF5fWVsc2V7dGhpcy5hdXRvcGxheSA9IHRydWV9O1xyXG4gICAgICAgIGlmKG9iai5kcmFnICE9IG51bGwpe3RoaXMuZHJhZ2dhYmxlID0gb2JqLmRyYWd9ZWxzZXt0aGlzLmRyYWdnYWJsZSA9IGZhbHNlfTtcclxuICAgICAgICBpZihvYmouY29udHJvbHMgIT0gbnVsbCl7dGhpcy5jb250cm9sc09uID0gb2JqLmNvbnRyb2xzfWVsc2V7dGhpcy5jb250cm9sc09uID0gdHJ1ZX07XHJcbiAgICAgICAgaWYob2JqLmFycm93cyAhPSBudWxsKXt0aGlzLmFycm93c09uID0gb2JqLmFycm93c31lbHNle3RoaXMuYXJyb3dzT24gPSB0cnVlfTtcclxuICAgICAgICBpZihvYmoua2V5Q29udHJvbCAhPSBudWxsKXt0aGlzLmtleUNvbnRyb2xPbiA9IG9iai5rZXlDb250cm9sfWVsc2V7dGhpcy5rZXlDb250cm9sT24gPSBmYWxzZX07XHJcblxyXG4gICAgICAgIGlmIChvYmouY2FsbGJhY2spe1xyXG4gICAgICAgICAgICBmb3IobGV0IGZ1bmN0IGluIGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tbZnVuY3RdID0gb2JqLmNhbGxiYWNrW2Z1bmN0XTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICh0aGlzLmNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodC9zY3JlZW4ud2lkdGgqdGhpcy5zbGlkZXIuY2xpZW50V2lkdGgrJ3B4JztcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodC9zY3JlZW4ud2lkdGgqdGhpcy5zbGlkZXIuY2xpZW50V2lkdGgrJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVOZXh0ID0gdGhpcy5zbGlkZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNsaWRlUHJldiA9IHRoaXMuc2xpZGVQcmV2LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMua2V5Q29udHJvbE9uKXtcclxuICAgICAgICB0aGlzLmtleUNvbnRyb2wgPSB0aGlzLmtleUNvbnRyb2wuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmtleUNvbnRyb2woKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5hcnJvd3NPbil7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQuY2xhc3NMaXN0LmFkZCgnbGVmdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQuY2xhc3NMaXN0LmFkZCgncmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2xpZGVOZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zbGlkZVByZXYpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmxlZnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnJpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nb1RvU2xpZGUgPSB0aGlzLmdvVG9TbGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0ID0gdGhpcy5pbml0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTd2lwZUxpc3RlbmVycyA9IHRoaXMuYWRkU3dpcGVMaXN0ZW5lcnMuYmluZCh0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmRyYWdnYWJsZSl7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdGhpcy5kcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kcmFnKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuY2xhc3NMaXN0LmFkZCgnaXRlbS1vdXRwdXQnKTtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUud2lkdGggPSAxMDAqdGhpcy5zbGlkZXMubGVuZ3RoKyclJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sc09uKXtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5jbGFzc0xpc3QuYWRkKCdjb250cm9scycpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbHMuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlcicsIG9iai5zZWxlY3Rvcik7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUud2lkdGggPSAoMTAwL3RoaXMuc2xpZGVzLmxlbmd0aCkrJyUnO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKXtcclxuICAgICAgICAgICAgbGV0IGltZyA9IHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBsZXQgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7c3JjfScpIGA7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XHJcbiAgICAgICAgICAgIGltZy5yZW1vdmUoKTt9OyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xzT24pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sRWxlbS5jbGFzc0xpc3QuYWRkKCdjb250cm9sLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9scy5hcHBlbmRDaGlsZChjb250cm9sRWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuaXRlbU91dHB1dCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHNPbil7XHJcbiAgICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kcmFnID0gbmV3IERyYWdFdmVudCh0aGlzLnNlbGVjdG9yKVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC5zbGlkZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ub1NsaWRlKGUudGFyZ2V0LmRhdGFzZXQuc2xpZGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IClcclxuICAgIH1cclxuXHJcbiAgICBhZGRTd2lwZUxpc3RlbmVycygpIHtcclxuICAgICAgIGxldCBkZXRlY3RpbmcgPSBmYWxzZSwgeCwgZGVsdGEsIG5ld1gsIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSk9PntcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggIT0gMSB8fCBzdGFydGVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjt9XHJcbiAgICAgICAgICAgICAgICBkZXRlY3RpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIHggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpPT57XHJcbiAgICAgICAgICAgIGlmICghc3RhcnRlZCAmJiAhZGV0ZWN0aW5nKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSB4LW5ld1g7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoZSk9PntcclxuICAgICAgICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMuaW5kZXhPZih0b3VjaCkgPT0gLTEgfHwgIXN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZGVsdGE+MD90aGlzLnNsaWRlTmV4dCgpOnRoaXMuc2xpZGVQcmV2KClcclxuXHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzbGlkZU5leHQgKCl7XHJcbiAgICAgICAgaWYodGhpcy5hY3RpdmVTbGlkZTx0aGlzLnNsaWRlcy5sZW5ndGgtMSl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSsrO1xyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAqdGhpcy5hY3RpdmVTbGlkZS90aGlzLnNsaWRlcy5sZW5ndGh9JSlgfVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUHJldigpIHtcclxuICAgICAgICBpZih0aGlzLmFjdGl2ZVNsaWRlPjApe1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLS07XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAqdGhpcy5hY3RpdmVTbGlkZS90aGlzLnNsaWRlcy5sZW5ndGh9JSlgfVxyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TbGlkZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBpbmRleDtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstMTAwKnRoaXMuYWN0aXZlU2xpZGUvdGhpcy5zbGlkZXMubGVuZ3RofSUpYFxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKXtcclxuICAgICAgICAgICAgbGV0IHgsIGRlbHRhLCBuZXdYLCBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICBsZXQgdG91Y2ggPSBlO1xyXG4gICAgICAgICAgICAgICAgICAgICB4ID0gdG91Y2gucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTsgXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSk9PntcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlmKHN0YXJ0ZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0geC1uZXdYO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKChkZWx0YT4wJiZ0aGlzLmFjdGl2ZVNsaWRlPHRoaXMuc2xpZGVzLmxlbmd0aC0xKXx8KGRlbHRhPDAmJnRoaXMuYWN0aXZlU2xpZGU+MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCp0aGlzLmFjdGl2ZVNsaWRlL3RoaXMuc2xpZGVzLmxlbmd0aC1kZWx0YSoxMDAvKHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoKnRoaXMuc2xpZGVzLmxlbmd0aCl9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZTtcclxuICAgICAgICAgICAgICAgIG5ld1ggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0geC1uZXdYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzIGVhc2UtaW4tb3V0JztcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YSk+NTApe2RlbHRhPjA/dGhpcy5zbGlkZU5leHQoKTp0aGlzLnNsaWRlUHJldigpfVxyXG4gICAgICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgIFxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgZWFzZS1pbi1vdXQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKT41MCl7ZGVsdGE+MD90aGlzLnNsaWRlTmV4dCgpOnRoaXMuc2xpZGVQcmV2KCl9ZWxzZXt0aGlzLmdvVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlKX1cclxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICBcclxuICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgKGUpPT57XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICB9KSAgXHJcbiAgICAgICAgfSAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpe1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9wbGF5SXRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF1dG9wbGF5RGlyZWN0aW9uID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlU2xpZGU9PXRoaXMuc2xpZGVzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZVByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b3BsYXlEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGtleUNvbnRyb2woKXtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSk9PntcclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlPT0zOSl7dGhpcy5zbGlkZU5leHQoKX07XHJcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZT09Mzcpe3RoaXMuc2xpZGVQcmV2KCl9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiIn0=