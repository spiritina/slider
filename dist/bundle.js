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
        onSLideChange () { console.log('chemged');
        console.log(this.activeSlide.value);
     }
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

        if (obj.callbacks){
           
            this.callbacks = obj.callbacks;
            console.log(this.callbacks);
            for (let funct in this.callbacks){
                this.callbacks[funct] = this.callbacks[funct].bind(this);

            }
            console.log(this.callbacks);
    }

    if (this.callbacks.beforeCreate){this.callbacks.beforeCreate()};
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
        this.activeSlide = {};
        this.activeSlide.value = 0;
        if(this.callbacks.onSLideChange){this.activeSlide.onSLideChange = this.callbacks.onSLideChange}
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
            this.goToSlide(+e.target.dataset.slide)
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
        if(this.activeSlide.value<this.slides.length-1){
        this.activeSlide.value++;
        if(this.callbacks.onSLideChange){this.activeSlide.onSLideChange()}
        this.itemOutput.style.transform = `translateX(${-100*this.activeSlide.value/this.slides.length}%)`}
    }

    slidePrev() {
        if(this.activeSlide.value>0){
            this.activeSlide.value--;
            if(this.callbacks.onSLideChange){this.activeSlide.onSLideChange()}
            this.itemOutput.style.transform = `translateX(${-100*this.activeSlide.value/this.slides.length}%)`}
    }

    goToSlide(index) {
        this.activeSlide.value = index;
        if(this.callbacks.onSLideChange){this.activeSlide.onSLideChange()}
        this.itemOutput.style.transform = `translateX(${-100*this.activeSlide.value/this.slides.length}%)`
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
                    if((delta>0&&this.activeSlide.value<this.slides.length-1)||(delta<0&&this.activeSlide.value>0)){
                        this.itemOutput.style.transition = 'none';
                        this.itemOutput.style.transform = `translateX(${-100*this.activeSlide.value/this.slides.length-delta*100/(this.slider.clientWidth*this.slides.length)}%)`
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
                if (Math.abs(delta)>50){delta>0?this.slideNext():this.slidePrev()}else{this.goToSlide(this.activeSlide.value)}
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
                    if (this.activeSlide.value==this.slides.length-1){
                        this.autoplayDirection = -1
                    }
                }else{
                    this.slidePrev();
                    if (this.activeSlide.value==0){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUJBQXlCO0FBQ2xELDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsb0JBQW9CLCtDQUFPO0FBQzNCLGlCOzs7Ozs7Ozs7Ozs7QUNqQkE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQyx5QkFBeUIsNkJBQTZCLEtBQUs7QUFDM0QsaUNBQWlDLDZCQUE2QixLQUFLO0FBQ25FLDZCQUE2QiwwQkFBMEIsS0FBSztBQUM1RCxpQ0FBaUMsK0JBQStCLEtBQUs7QUFDckUsK0JBQStCLDJCQUEyQixLQUFLO0FBQy9ELG1DQUFtQyxtQ0FBbUMsS0FBSzs7OztBQUkzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsSUFBSTtBQUMvRDtBQUNBO0FBQ0EsMkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsd0RBQXdELCtDQUErQztBQUN2Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsNERBQTRELCtDQUErQztBQUMzRzs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLHdEQUF3RCwrQ0FBK0M7QUFDdkc7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxzR0FBc0c7QUFDOUs7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywwQ0FBMEMsS0FBSztBQUN2RjtBQUNBOztBQUVBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBLGNBQWM7QUFDZCxTO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCLFNBQVM7QUFDVDs7QUFFQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4vc2xpZGVyJztcclxuXHJcbmNvbnN0IGdhbGxlcnlTZXR0aW5ncyA9IHtcclxuICAgIHNlbGVjdG9yOiAnI2dhbGxlcnknLFxyXG4gICAgaXRlbVNlbGVjdG9yOicuZ2FsbGVyeS1pdGVtJyxcclxuICAgIGludGVydmFsOiAzMDAwLFxyXG4gICAgZHJhZzogdHJ1ZSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIGJlZm9yZUNyZWF0ZSAoKSB7IGNvbnNvbGUubG9nKCdjcmVhdGVkJykgfSxcclxuICAgICAgICBvblNMaWRlQ2hhbmdlICgpIHsgY29uc29sZS5sb2coJ2NoZW1nZWQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlKTtcclxuICAgICB9XHJcbiAgICB9LFxyXG4gICAga2V5Q29udHJvbDogdHJ1ZVxyXG59XHJcblxyXG5sZXQgTmV3U2xpZGVyID0gbmV3IEdhbGxlcnkoZ2FsbGVyeVNldHRpbmdzKTtcclxuTmV3U2xpZGVyLmluaXQoKTsiLCJleHBvcnQgY2xhc3MgR2FsbGVyeSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvYmopIHtcclxuICAgICAgICB0aGlzLnBhcmFtcyA9IG9iajtcclxuICAgICAgICB0aGlzLnNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob2JqLnNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLnNsaWRlcyA9IHRoaXMuc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwob2JqLml0ZW1TZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmIChvYmouY2FsbGJhY2tzKXtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBvYmouY2FsbGJhY2tzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhbGxiYWNrcyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZ1bmN0IGluIHRoaXMuY2FsbGJhY2tzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2Z1bmN0XSA9IHRoaXMuY2FsbGJhY2tzW2Z1bmN0XS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhbGxiYWNrcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY2FsbGJhY2tzLmJlZm9yZUNyZWF0ZSl7dGhpcy5jYWxsYmFja3MuYmVmb3JlQ3JlYXRlKCl9O1xyXG4gICAgICAgIGlmKG9iai5pbnRlcnZhbCl7dGhpcy5pbnRlcnZhbCA9IG9iai5pbnRlcnZhbH1lbHNle3RoaXMuaW50ZXJ2YWwgPSAyMDAwfTtcclxuICAgICAgICBpZihvYmouYXV0b3BsYXkgIT0gbnVsbCl7dGhpcy5hdXRvcGxheSA9IG9iai5hdXRvcGxheX1lbHNle3RoaXMuYXV0b3BsYXkgPSB0cnVlfTtcclxuICAgICAgICBpZihvYmouZHJhZyAhPSBudWxsKXt0aGlzLmRyYWdnYWJsZSA9IG9iai5kcmFnfWVsc2V7dGhpcy5kcmFnZ2FibGUgPSBmYWxzZX07XHJcbiAgICAgICAgaWYob2JqLmNvbnRyb2xzICE9IG51bGwpe3RoaXMuY29udHJvbHNPbiA9IG9iai5jb250cm9sc31lbHNle3RoaXMuY29udHJvbHNPbiA9IHRydWV9O1xyXG4gICAgICAgIGlmKG9iai5hcnJvd3MgIT0gbnVsbCl7dGhpcy5hcnJvd3NPbiA9IG9iai5hcnJvd3N9ZWxzZXt0aGlzLmFycm93c09uID0gdHJ1ZX07XHJcbiAgICAgICAgaWYob2JqLmtleUNvbnRyb2wgIT0gbnVsbCl7dGhpcy5rZXlDb250cm9sT24gPSBvYmoua2V5Q29udHJvbH1lbHNle3RoaXMua2V5Q29udHJvbE9uID0gZmFsc2V9O1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodC9zY3JlZW4ud2lkdGgqdGhpcy5zbGlkZXIuY2xpZW50V2lkdGgrJ3B4JztcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodC9zY3JlZW4ud2lkdGgqdGhpcy5zbGlkZXIuY2xpZW50V2lkdGgrJ3B4JztcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB7fTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlID0gMDtcclxuICAgICAgICBpZih0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlKXt0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UgPSB0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlfVxyXG4gICAgICAgIHRoaXMuc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVOZXh0ID0gdGhpcy5zbGlkZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNsaWRlUHJldiA9IHRoaXMuc2xpZGVQcmV2LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMua2V5Q29udHJvbE9uKXtcclxuICAgICAgICB0aGlzLmtleUNvbnRyb2wgPSB0aGlzLmtleUNvbnRyb2wuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmtleUNvbnRyb2woKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5hcnJvd3NPbil7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQuY2xhc3NMaXN0LmFkZCgnbGVmdCcpO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQuY2xhc3NMaXN0LmFkZCgncmlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2xpZGVOZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zbGlkZVByZXYpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmxlZnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnJpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nb1RvU2xpZGUgPSB0aGlzLmdvVG9TbGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0ID0gdGhpcy5pbml0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTd2lwZUxpc3RlbmVycyA9IHRoaXMuYWRkU3dpcGVMaXN0ZW5lcnMuYmluZCh0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmRyYWdnYWJsZSl7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdGhpcy5kcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kcmFnKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuY2xhc3NMaXN0LmFkZCgnaXRlbS1vdXRwdXQnKTtcclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUud2lkdGggPSAxMDAqdGhpcy5zbGlkZXMubGVuZ3RoKyclJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sc09uKXtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5jbGFzc0xpc3QuYWRkKCdjb250cm9scycpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbHMuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlcicsIG9iai5zZWxlY3Rvcik7fVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUud2lkdGggPSAoMTAwL3RoaXMuc2xpZGVzLmxlbmd0aCkrJyUnO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKCdzbGlkZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKXtcclxuICAgICAgICAgICAgbGV0IGltZyA9IHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgICAgICBsZXQgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJyR7c3JjfScpIGA7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XHJcbiAgICAgICAgICAgIGltZy5yZW1vdmUoKTt9OyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xzT24pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sRWxlbS5jbGFzc0xpc3QuYWRkKCdjb250cm9sLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9scy5hcHBlbmRDaGlsZChjb250cm9sRWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuaXRlbU91dHB1dCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbHNPbil7XHJcbiAgICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kcmFnID0gbmV3IERyYWdFdmVudCh0aGlzLnNlbGVjdG9yKVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC5zbGlkZSl7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ub1NsaWRlKCtlLnRhcmdldC5kYXRhc2V0LnNsaWRlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSApXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3dpcGVMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICBsZXQgZGV0ZWN0aW5nID0gZmFsc2UsIHgsIGRlbHRhLCBuZXdYLCBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKGUpPT57XHJcbiAgICAgICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoICE9IDEgfHwgc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47fVxyXG4gICAgICAgICAgICAgICAgZGV0ZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICB4ID0gdG91Y2gucGFnZVg7XHJcbiAgICAgICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKT0+e1xyXG4gICAgICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgIWRldGVjdGluZyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIG5ld1ggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0geC1uZXdYO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKGUpPT57XHJcbiAgICAgICAgICAgIGlmIChlLmNoYW5nZWRUb3VjaGVzLmluZGV4T2YodG91Y2gpID09IC0xIHx8ICFzdGFydGVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGRlbHRhPjA/dGhpcy5zbGlkZU5leHQoKTp0aGlzLnNsaWRlUHJldigpXHJcblxyXG4gICAgICAgIH0pXHJcbiAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2xpZGVOZXh0ICgpe1xyXG4gICAgICAgIGlmKHRoaXMuYWN0aXZlU2xpZGUudmFsdWU8dGhpcy5zbGlkZXMubGVuZ3RoLTEpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUudmFsdWUrKztcclxuICAgICAgICBpZih0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlKXt0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UoKX1cclxuICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstMTAwKnRoaXMuYWN0aXZlU2xpZGUudmFsdWUvdGhpcy5zbGlkZXMubGVuZ3RofSUpYH1cclxuICAgIH1cclxuXHJcbiAgICBzbGlkZVByZXYoKSB7XHJcbiAgICAgICAgaWYodGhpcy5hY3RpdmVTbGlkZS52YWx1ZT4wKXtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZS52YWx1ZS0tO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlKXt0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UoKX1cclxuICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCp0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlL3RoaXMuc2xpZGVzLmxlbmd0aH0lKWB9XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ub1NsaWRlKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA9IGluZGV4O1xyXG4gICAgICAgIGlmKHRoaXMuY2FsbGJhY2tzLm9uU0xpZGVDaGFuZ2Upe3RoaXMuYWN0aXZlU2xpZGUub25TTGlkZUNoYW5nZSgpfVxyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAqdGhpcy5hY3RpdmVTbGlkZS52YWx1ZS90aGlzLnNsaWRlcy5sZW5ndGh9JSlgXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYWcoKXtcclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2FibGUpe1xyXG4gICAgICAgICAgICBsZXQgeCwgZGVsdGEsIG5ld1gsIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpPT57XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pOyBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKT0+e1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3RhcnRlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdYID0gdG91Y2gucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSB4LW5ld1g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoKGRlbHRhPjAmJnRoaXMuYWN0aXZlU2xpZGUudmFsdWU8dGhpcy5zbGlkZXMubGVuZ3RoLTEpfHwoZGVsdGE8MCYmdGhpcy5hY3RpdmVTbGlkZS52YWx1ZT4wKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstMTAwKnRoaXMuYWN0aXZlU2xpZGUudmFsdWUvdGhpcy5zbGlkZXMubGVuZ3RoLWRlbHRhKjEwMC8odGhpcy5zbGlkZXIuY2xpZW50V2lkdGgqdGhpcy5zbGlkZXMubGVuZ3RoKX0lKWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpPT57XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91Y2ggPSBlO1xyXG4gICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSB4LW5ld1g7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgZWFzZS1pbi1vdXQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKT41MCl7ZGVsdGE+MD90aGlzLnNsaWRlTmV4dCgpOnRoaXMuc2xpZGVQcmV2KCl9XHJcbiAgICAgICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgXHJcbiAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpPT57XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZihzdGFydGVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyBlYXNlLWluLW91dCc7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpPjUwKXtkZWx0YT4wP3RoaXMuc2xpZGVOZXh0KCk6dGhpcy5zbGlkZVByZXYoKX1lbHNle3RoaXMuZ29Ub1NsaWRlKHRoaXMuYWN0aXZlU2xpZGUudmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgIFxyXG4gICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCAoZSk9PntcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgIH0pICBcclxuICAgICAgICB9ICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b3BsYXlJdGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0b3BsYXlEaXJlY3Rpb24gPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZU5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZS52YWx1ZT09dGhpcy5zbGlkZXMubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9wbGF5RGlyZWN0aW9uID0gLTFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlUHJldigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLmludGVydmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAga2V5Q29udHJvbCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKT0+e1xyXG4gICAgICAgICAgICBpZihlLmtleUNvZGU9PTM5KXt0aGlzLnNsaWRlTmV4dCgpfTtcclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlPT0zNyl7dGhpcy5zbGlkZVByZXYoKX07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==