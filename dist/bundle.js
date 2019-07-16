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


let gallerySettings = {};
window.onload = () => {
    let sliderControl = document.getElementById('sliderControl');
    if(localStorage.getItem('settings')){
        gallerySettings = JSON.parse(localStorage.getItem('settings'));
        setInputs();
        
    } else{ 
        gallerySettings = {
            selector: '#gallery',
            itemSelector:'.gallery-item',
            interval: 3000,
            draggable: true,
            callbacks: {
                beforeCreate: function() { console.log('created') },
                onSLideChange:function () { 
                    console.log('chenged');
                    console.log(this.activeSlide.value);
             }
            },
            keyControl: true,
            autoplay: true,
            controls: true,
            arrows: true
        };
        setInputs();
    }
    
    function setInputs(){
        let checkboxes = sliderControl.querySelectorAll("[type='checkbox']");
        for(let i=0; i < checkboxes.length; i++){
            let name = checkboxes[i].getAttribute('name');
            checkboxes[i].checked = gallerySettings[name];
        }
        let interval = sliderControl.querySelector("[type='number']");
        interval.value = gallerySettings.interval;
    }
let NewSlider = new _slider__WEBPACK_IMPORTED_MODULE_0__["Gallery"](gallerySettings);
NewSlider.init();


let setGallerySettings = (e)=> {
    e.preventDefault();
    let checkboxes = sliderControl.querySelectorAll("[type='checkbox']");
    for(let i=0; i < checkboxes.length; i++){
        let name = checkboxes[i].getAttribute('name');
        gallerySettings[name] = checkboxes[i].checked;
    }
    let interval = parseFloat(sliderControl.querySelector("[type='number']").value);
    if (isNaN(interval)){
        gallerySettings.interval = 2000
    } else {
        gallerySettings.interval = interval
    }
    NewSlider.destroy();
    NewSlider = new _slider__WEBPACK_IMPORTED_MODULE_0__["Gallery"](gallerySettings);
    NewSlider.init();
    localStorage.setItem('settings', JSON.stringify(gallerySettings));
};

sliderControl.addEventListener('submit', setGallerySettings);
};




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
        this.settings = {
            autoplay: true,
            arrows: true,
            controls: true,
            draggable: false,
            keyControl: false,
            interval: 2000
        };
        for (let key in obj){
        this.settings[key] = obj[key];
        }
        
        this.slider = document.querySelector(this.settings.selector);
        this.slides = this.slider.querySelectorAll(this.settings.itemSelector);
        if (this.settings.callbacks) {
            this.callbacks = {};
            for (let funct in this.settings.callbacks) {
                this.callbacks[funct] = this.settings.callbacks[funct];
                this.callbacks[funct] = this.callbacks[funct].bind(this);
            }
        }
        this.getSettings = this.getSettings.bind(this);
        

        if (this.callbacks.beforeCreate) {
            this.callbacks.beforeCreate()
        };
        this.setStyles = this.setStyles.bind(this);
        this.init = this.init.bind(this);
        this.slideNext = this.slideNext.bind(this);
        this.slidePrev = this.slidePrev.bind(this);
        this.addArrows = this.addArrows.bind(this);
        this.addSwipeListeners = this.addSwipeListeners.bind(this);
        this.goToSlide = this.goToSlide.bind(this);
        this.keyControl = this.keyControl.bind(this);
        this.drag = this.drag.bind(this);
        this.autoplayStart = this.autoplayStart.bind(this);
        this.autoplayStop = this.autoplayStop.bind(this); 
        this.destroy = this.destroy.bind(this);
    }

    getSettings(){
        this.activeSlide = {};
        this.activeSlide.value = 0;
        this.activeSlide.onSLideChange = this.callbacks.onSLideChange;
    }

    setStyles(){
        this.slider.style.overflow = 'hidden';
        this.slider.style.position = 'relative';
        this.slider.style.width = '100%';
        this.autoplayDirection = 1;
        this.slider.style.height = screen.height / screen.width * this.slider.clientWidth + 'px';
        this.handlerResize = (e) => {
            this.slider.style.height = screen.height / screen.width * this.slider.clientWidth + 'px';
            
        }

        window.addEventListener('resize', this.handlerResize);

        this.itemOutput = document.createElement('div');
        this.itemOutput.classList.add('item-output');
        this.itemOutput.style.width = 100 * this.slides.length + '%';

        if (this.settings.controls) {
            this.controls = document.createElement('div');
            this.controls.classList.add('controls');
            this.controls.setAttribute('data-slider', this.settings.selector);
        }
        this.srcs = [];
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.width = (100 / this.slides.length) + '%';
            this.slides[i].classList.add('slide-item');
            if (this.slides[i].querySelector('img')) {
                let img = this.slides[i].querySelector('img');
                let src = img.getAttribute('src');
                this.srcs.push(src);
                this.slides[i].style.backgroundImage = `url('${src}') `;
                this.slides[i].style.backgroundSize = 'cover';
                this.slides[i].style.backgroundPosition = 'center';
                img.remove();
            };
            if (this.settings.controls) {
                let controlElem = document.createElement('div');
                controlElem.classList.add('control-element');
                controlElem.setAttribute('data-slide', i);
                this.controls.appendChild(controlElem);
            }

            this.itemOutput.appendChild(this.slides[i]);
        }

        this.slider.appendChild(this.itemOutput);

        if (this.settings.controls) {
            this.handlerConrtolsClick = (e) => {
                if (e.target.dataset.slide) {
                    this.goToSlide(+e.target.dataset.slide);
                    
                }
            } 
            this.slider.appendChild(this.controls);
            this.controls.addEventListener('click', this.handlerConrtolsClick);

        }
       
    }

    addArrows(){
        this.left = document.createElement('div');
        this.left.classList.add('left');
        this.right = document.createElement('div');
        this.right.classList.add('right');
        this.right.addEventListener('click', this.slideNext);
        this.left.addEventListener('click', this.slidePrev);
        this.slider.appendChild(this.left);
        this.slider.appendChild(this.right);
    }

    addSwipeListeners() {
        let detecting = false, x, delta, newX, started = false;
        this.handlerTouchStart = (e) => {
            if (e.touches.length != 1 || started) {
                return;
            }
            detecting = true;
            let touch = e.changedTouches[0];
            x = touch.pageX;
            started = true;
        }

        this.handlerTouchMove = (e) => {
            if (!started && !detecting) {
                return;
            }
            let touch = e.changedTouches[0];
            newX = touch.pageX;
            delta = x - newX;
        }

        this.handlerTouchEnd = (e) => {
            if (e.changedTouches.indexOf(touch) == -1 || !started) {
                return;
            }
            e.preventDefault();
            delta > 0 ? this.slideNext() : this.slidePrev()
        }

        this.addEventListener('touchstart', this.handlerTouchStart);

        this.addEventListener('touchmove', this.handlerTouchMove);

        this.addEventListener('touchend', this.handlerTouchEnd);

    }


    slideNext() {
        if (this.activeSlide.value < this.slides.length - 1) {
            this.activeSlide.value++;
            if (this.callbacks.onSLideChange) this.activeSlide.onSLideChange();
            this.itemOutput.style.transform = `translateX(${-100 * this.activeSlide.value / this.slides.length}%)`
        }
    }

    slidePrev() {
        if (this.activeSlide.value > 0) {
            this.activeSlide.value--;
            if (this.callbacks.onSLideChange) { this.activeSlide.onSLideChange() }
            this.itemOutput.style.transform = `translateX(${-100 * this.activeSlide.value / this.slides.length}%)`
        }
    }

    goToSlide(index) {
        this.activeSlide.value = index;
        if (this.callbacks.onSLideChange) { this.activeSlide.onSLideChange() }
        this.itemOutput.style.transform = `translateX(${-100 * this.activeSlide.value / this.slides.length}%)`
    }

    destroy() {
        this.autoplayStop();
        this.slider.removeEventListener('mousedown', this.handlerMouseDown);
        this.slider.removeEventListener('mousemove', this.handlerMouseMove);
        this.slider.removeEventListener('mouseup', this.handlerMouseUp);
        this.slider.removeEventListener('mouseout', this.handlerMouseOut);
        document.body.removeEventListener('keydown', this.handlerKeyControl);
        window.removeEventListener('resize', this.handlerResize);
        if(this.settings.controls){
            this.controls.removeEventListener('click', this.handlerConrtolsClick);
            let controlElem =  this.controls.children;
            for (let i = 0; i < controlElem.length; i++){
             controlElem[i].remove();
            }
        }
        if(this.settings.arrows){
            this.right.removeEventListener('click', this.slideNext);
            this.left.removeEventListener('click', this.slidePrev);
            this.left.remove();
            this.right.remove();
        }
        this.slider.removeEventListener('touchstart', this.handlerTouchStart);
        this.slider.removeEventListener('touchmove', this.handlerTouchMove);
        this.slider.removeEventListener('touchend', this.handlerTouchEnd);
        delete this.settings;
        delete this.slideNext;
        delete this.slidePrev;
  
        for (let i = 0; i < this.slides.length; i++) {
            let img = document.createElement('img');
            img.setAttribute('src', this.srcs[i]);
            this.slides[i].appendChild(img);
            this.slides[i].style.float = 'clear(both)';
            this.slider.appendChild(this.slides[i]);
            this.slides[i].classList.remove('slide-item');
            this.slides[i].style = '';
            }
        this.controls.remove();
        this.slider.style = '';
    }

    drag() {
        if (this.settings.draggable) {
            let x, delta, newX, started = false;
            this.handlerMouseDown = (e) => {
                e.preventDefault();
                let touch = e;
                x = touch.pageX;
                started = true;
                this.autoplayStop();
            }
            this.handlerMouseMove = (e) => {
                e.preventDefault();
                if (started) {
                    let touch = e;
                    newX = touch.pageX;
                    delta = x - newX;
                    if ((delta > 0 && this.activeSlide.value < this.slides.length - 1) || (delta < 0 && this.activeSlide.value > 0)) {
                        this.itemOutput.style.transition = 'none';
                        this.itemOutput.style.transform = `translateX(${-100 * this.activeSlide.value / this.slides.length - delta * 100 / (this.slider.clientWidth * this.slides.length)}%)`
                    }
                }
            }       
            this.handlerMouseUp = (e) => {
                e.preventDefault();
                let touch = e;
                newX = touch.pageX;
                delta = x - newX;
                this.itemOutput.style.transition = 'all 1s ease-in-out';
                if (Math.abs(delta) > 50) { delta > 0 ? this.slideNext() : this.slidePrev() }
                started = false;
                if(this.autoplay)this.autoplayStart();
            }
            this.handlerMouseOut = (e) => {
                e.preventDefault();
                if (started) {
                    this.itemOutput.style.transition = 'all 1s ease-in-out';
                    if (Math.abs(delta) > 50) { delta > 0 ? this.slideNext() : this.slidePrev() } else { this.goToSlide(this.activeSlide.value) }
                    started = false;
                }
            }   

            this.slider.addEventListener('mousedown', this.handlerMouseDown);

            this.slider.addEventListener('mousemove', this.handlerMouseMove);

            this.slider.addEventListener('mouseup', this.handlerMouseUp);
            
            this.slider.addEventListener('mouseout', this.handlerMouseOut);
        }
    }

    autoplayStart(){
        this.autoplayIterval = setInterval(() => {
            if (this.autoplayDirection == 1) {
                this.slideNext();
                if (this.activeSlide.value == this.slides.length - 1) {
                    this.autoplayDirection = -1
                }
            } else {
                this.slidePrev();
                if (this.activeSlide.value == 0) {
                    this.autoplayDirection = 1;
                }
            }
        }, this.settings.interval);
    }

    autoplayStop(){
     clearInterval(this.autoplayIterval);   
    }

    keyControl() {
        this.handlerKeyControl = (e) => {
            if (e.keyCode == 39) { this.slideNext() };
            if (e.keyCode == 37) { this.slidePrev() };
           
        }
        document.body.addEventListener('keydown', this.handlerKeyControl);
    }


    init() {
        
        this.getSettings();
        this.setStyles();
        if (this.settings.arrows) this.addArrows();
        if (this.settings.keyControl) this.keyControl();
        if (this.settings.draggable) this.drag();
        if (this.settings.autoplay) this.autoplayStart();
      
    }

    
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxNO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlCQUF5QjtBQUNuRSwyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQU87QUFDM0I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQ0FBTztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0RBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxJQUFJO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELG1EQUFtRDtBQUMvRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQyw0REFBNEQsbURBQW1EO0FBQy9HO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyx3REFBd0QsbURBQW1EO0FBQzNHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsd0JBQXdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLGtIQUFrSDtBQUMxTDtBQUNBO0FBQ0EsYTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxrREFBa0QsT0FBTztBQUN4RztBQUNBO0FBQ0EsYTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLHlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4vc2xpZGVyJztcclxuXHJcbmxldCBnYWxsZXJ5U2V0dGluZ3MgPSB7fTtcclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGxldCBzbGlkZXJDb250cm9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlckNvbnRyb2wnKTtcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXR0aW5ncycpKXtcclxuICAgICAgICBnYWxsZXJ5U2V0dGluZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXR0aW5ncycpKTtcclxuICAgICAgICBzZXRJbnB1dHMoKTtcclxuICAgICAgICBcclxuICAgIH0gZWxzZXsgXHJcbiAgICAgICAgZ2FsbGVyeVNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RvcjogJyNnYWxsZXJ5JyxcclxuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOicuZ2FsbGVyeS1pdGVtJyxcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IDMwMDAsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgICAgICAgICBiZWZvcmVDcmVhdGU6IGZ1bmN0aW9uKCkgeyBjb25zb2xlLmxvZygnY3JlYXRlZCcpIH0sXHJcbiAgICAgICAgICAgICAgICBvblNMaWRlQ2hhbmdlOmZ1bmN0aW9uICgpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZW5nZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAga2V5Q29udHJvbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiB0cnVlLFxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldElucHV0cygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBzZXRJbnB1dHMoKXtcclxuICAgICAgICBsZXQgY2hlY2tib3hlcyA9IHNsaWRlckNvbnRyb2wucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPSdjaGVja2JveCddXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgY2hlY2tib3hlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gY2hlY2tib3hlc1tpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICAgICAgY2hlY2tib3hlc1tpXS5jaGVja2VkID0gZ2FsbGVyeVNldHRpbmdzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzbGlkZXJDb250cm9sLnF1ZXJ5U2VsZWN0b3IoXCJbdHlwZT0nbnVtYmVyJ11cIik7XHJcbiAgICAgICAgaW50ZXJ2YWwudmFsdWUgPSBnYWxsZXJ5U2V0dGluZ3MuaW50ZXJ2YWw7XHJcbiAgICB9XHJcbmxldCBOZXdTbGlkZXIgPSBuZXcgR2FsbGVyeShnYWxsZXJ5U2V0dGluZ3MpO1xyXG5OZXdTbGlkZXIuaW5pdCgpO1xyXG5cclxuXHJcbmxldCBzZXRHYWxsZXJ5U2V0dGluZ3MgPSAoZSk9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgY2hlY2tib3hlcyA9IHNsaWRlckNvbnRyb2wucXVlcnlTZWxlY3RvckFsbChcIlt0eXBlPSdjaGVja2JveCddXCIpO1xyXG4gICAgZm9yKGxldCBpPTA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgbmFtZSA9IGNoZWNrYm94ZXNbaV0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgICAgZ2FsbGVyeVNldHRpbmdzW25hbWVdID0gY2hlY2tib3hlc1tpXS5jaGVja2VkO1xyXG4gICAgfVxyXG4gICAgbGV0IGludGVydmFsID0gcGFyc2VGbG9hdChzbGlkZXJDb250cm9sLnF1ZXJ5U2VsZWN0b3IoXCJbdHlwZT0nbnVtYmVyJ11cIikudmFsdWUpO1xyXG4gICAgaWYgKGlzTmFOKGludGVydmFsKSl7XHJcbiAgICAgICAgZ2FsbGVyeVNldHRpbmdzLmludGVydmFsID0gMjAwMFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBnYWxsZXJ5U2V0dGluZ3MuaW50ZXJ2YWwgPSBpbnRlcnZhbFxyXG4gICAgfVxyXG4gICAgTmV3U2xpZGVyLmRlc3Ryb3koKTtcclxuICAgIE5ld1NsaWRlciA9IG5ldyBHYWxsZXJ5KGdhbGxlcnlTZXR0aW5ncyk7XHJcbiAgICBOZXdTbGlkZXIuaW5pdCgpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NldHRpbmdzJywgSlNPTi5zdHJpbmdpZnkoZ2FsbGVyeVNldHRpbmdzKSk7XHJcbn07XHJcblxyXG5zbGlkZXJDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHNldEdhbGxlcnlTZXR0aW5ncyk7XHJcbn07XHJcblxyXG5cclxuIiwiZXhwb3J0IGNsYXNzIEdhbGxlcnkge1xyXG4gICAgY29uc3RydWN0b3Iob2JqKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICAgICAgY29udHJvbHM6IHRydWUsXHJcbiAgICAgICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGtleUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogMjAwMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9iail7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nc1trZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLnNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLnNsaWRlcyA9IHRoaXMuc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zZXR0aW5ncy5pdGVtU2VsZWN0b3IpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmdW5jdCBpbiB0aGlzLnNldHRpbmdzLmNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbZnVuY3RdID0gdGhpcy5zZXR0aW5ncy5jYWxsYmFja3NbZnVuY3RdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbZnVuY3RdID0gdGhpcy5jYWxsYmFja3NbZnVuY3RdLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRTZXR0aW5ncyA9IHRoaXMuZ2V0U2V0dGluZ3MuYmluZCh0aGlzKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLmJlZm9yZUNyZWF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5iZWZvcmVDcmVhdGUoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZXMgPSB0aGlzLnNldFN0eWxlcy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaW5pdCA9IHRoaXMuaW5pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVOZXh0ID0gdGhpcy5zbGlkZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNsaWRlUHJldiA9IHRoaXMuc2xpZGVQcmV2LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRBcnJvd3MgPSB0aGlzLmFkZEFycm93cy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkU3dpcGVMaXN0ZW5lcnMgPSB0aGlzLmFkZFN3aXBlTGlzdGVuZXJzLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nb1RvU2xpZGUgPSB0aGlzLmdvVG9TbGlkZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMua2V5Q29udHJvbCA9IHRoaXMua2V5Q29udHJvbC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZHJhZyA9IHRoaXMuZHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYXV0b3BsYXlTdGFydCA9IHRoaXMuYXV0b3BsYXlTdGFydC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYXV0b3BsYXlTdG9wID0gdGhpcy5hdXRvcGxheVN0b3AuYmluZCh0aGlzKTsgXHJcbiAgICAgICAgdGhpcy5kZXN0cm95ID0gdGhpcy5kZXN0cm95LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V0dGluZ3MoKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlID0ge307XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZS5vblNMaWRlQ2hhbmdlID0gdGhpcy5jYWxsYmFja3Mub25TTGlkZUNoYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdHlsZXMoKXtcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgICAgICB0aGlzLmF1dG9wbGF5RGlyZWN0aW9uID0gMTtcclxuICAgICAgICB0aGlzLnNsaWRlci5zdHlsZS5oZWlnaHQgPSBzY3JlZW4uaGVpZ2h0IC8gc2NyZWVuLndpZHRoICogdGhpcy5zbGlkZXIuY2xpZW50V2lkdGggKyAncHgnO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlclJlc2l6ZSA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9IHNjcmVlbi5oZWlnaHQgLyBzY3JlZW4ud2lkdGggKiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlclJlc2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dC5jbGFzc0xpc3QuYWRkKCdpdGVtLW91dHB1dCcpO1xyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS53aWR0aCA9IDEwMCAqIHRoaXMuc2xpZGVzLmxlbmd0aCArICclJztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udHJvbHMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlcicsIHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNyY3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gKDEwMCAvIHRoaXMuc2xpZGVzLmxlbmd0aCkgKyAnJSc7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3NsaWRlLWl0ZW0nKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVzW2ldLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhpcy5zbGlkZXNbaV0ucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNyY3MucHVzaChzcmMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtzcmN9JykgYDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xyXG4gICAgICAgICAgICAgICAgaW1nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250cm9scykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sRWxlbS5jbGFzc0xpc3QuYWRkKCdjb250cm9sLWVsZW1lbnQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9scy5hcHBlbmRDaGlsZChjb250cm9sRWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLml0ZW1PdXRwdXQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250cm9scykge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJDb25ydG9sc0NsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LnNsaWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb1RvU2xpZGUoK2UudGFyZ2V0LmRhdGFzZXQuc2xpZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckNvbnJ0b2xzQ2xpY2spO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBhZGRBcnJvd3MoKXtcclxuICAgICAgICB0aGlzLmxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmxlZnQuY2xhc3NMaXN0LmFkZCgnbGVmdCcpO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnJpZ2h0LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0Jyk7XHJcbiAgICAgICAgdGhpcy5yaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2xpZGVOZXh0KTtcclxuICAgICAgICB0aGlzLmxlZnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNsaWRlUHJldik7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5sZWZ0KTtcclxuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnJpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTd2lwZUxpc3RlbmVycygpIHtcclxuICAgICAgICBsZXQgZGV0ZWN0aW5nID0gZmFsc2UsIHgsIGRlbHRhLCBuZXdYLCBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyVG91Y2hTdGFydCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoICE9IDEgfHwgc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRldGVjdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgIHggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZXJUb3VjaE1vdmUgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXN0YXJ0ZWQgJiYgIWRldGVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgIG5ld1ggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgZGVsdGEgPSB4IC0gbmV3WDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlclRvdWNoRW5kID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXMuaW5kZXhPZih0b3VjaCkgPT0gLTEgfHwgIXN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGRlbHRhID4gMCA/IHRoaXMuc2xpZGVOZXh0KCkgOiB0aGlzLnNsaWRlUHJldigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZXJUb3VjaFN0YXJ0KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZXJUb3VjaE1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVyVG91Y2hFbmQpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgc2xpZGVOZXh0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlIDwgdGhpcy5zbGlkZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlKSB0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCAqIHRoaXMuYWN0aXZlU2xpZGUudmFsdWUgLyB0aGlzLnNsaWRlcy5sZW5ndGh9JSlgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUHJldigpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTbGlkZS52YWx1ZS0tO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFja3Mub25TTGlkZUNoYW5nZSkgeyB0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UoKSB9XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAgKiB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlIC8gdGhpcy5zbGlkZXMubGVuZ3RofSUpYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnb1RvU2xpZGUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlID0gaW5kZXg7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLm9uU0xpZGVDaGFuZ2UpIHsgdGhpcy5hY3RpdmVTbGlkZS5vblNMaWRlQ2hhbmdlKCkgfVxyXG4gICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAgKiB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlIC8gdGhpcy5zbGlkZXMubGVuZ3RofSUpYFxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheVN0b3AoKTtcclxuICAgICAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJNb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlck1vdXNlTW92ZSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlck1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5oYW5kbGVyTW91c2VPdXQpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlcktleUNvbnRyb2wpO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZXJSZXNpemUpO1xyXG4gICAgICAgIGlmKHRoaXMuc2V0dGluZ3MuY29udHJvbHMpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQ29ucnRvbHNDbGljayk7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sRWxlbSA9ICB0aGlzLmNvbnRyb2xzLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xFbGVtLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgIGNvbnRyb2xFbGVtW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2V0dGluZ3MuYXJyb3dzKXtcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2xpZGVOZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zbGlkZVByZXYpO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZXJUb3VjaFN0YXJ0KTtcclxuICAgICAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZXJUb3VjaE1vdmUpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVyVG91Y2hFbmQpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNldHRpbmdzO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNsaWRlTmV4dDtcclxuICAgICAgICBkZWxldGUgdGhpcy5zbGlkZVByZXY7XHJcbiAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoaXMuc3Jjc1tpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlLmZsb2F0ID0gJ2NsZWFyKGJvdGgpJztcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQodGhpcy5zbGlkZXNbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZS1pdGVtJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLnN0eWxlID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRyb2xzLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZygpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kcmFnZ2FibGUpIHtcclxuICAgICAgICAgICAgbGV0IHgsIGRlbHRhLCBuZXdYLCBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck1vdXNlRG93biA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91Y2ggPSBlO1xyXG4gICAgICAgICAgICAgICAgeCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9wbGF5U3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck1vdXNlTW92ZSA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0geCAtIG5ld1g7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkZWx0YSA+IDAgJiYgdGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA8IHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEpIHx8IChkZWx0YSA8IDAgJiYgdGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA+IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstMTAwICogdGhpcy5hY3RpdmVTbGlkZS52YWx1ZSAvIHRoaXMuc2xpZGVzLmxlbmd0aCAtIGRlbHRhICogMTAwIC8gKHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoICogdGhpcy5zbGlkZXMubGVuZ3RoKX0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck1vdXNlVXAgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZTtcclxuICAgICAgICAgICAgICAgIG5ld1ggPSB0b3VjaC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0geCAtIG5ld1g7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgZWFzZS1pbi1vdXQnO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKSA+IDUwKSB7IGRlbHRhID4gMCA/IHRoaXMuc2xpZGVOZXh0KCkgOiB0aGlzLnNsaWRlUHJldigpIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXV0b3BsYXkpdGhpcy5hdXRvcGxheVN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyTW91c2VPdXQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgZWFzZS1pbi1vdXQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPiA1MCkgeyBkZWx0YSA+IDAgPyB0aGlzLnNsaWRlTmV4dCgpIDogdGhpcy5zbGlkZVByZXYoKSB9IGVsc2UgeyB0aGlzLmdvVG9TbGlkZSh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZXJNb3VzZURvd24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVyTW91c2VNb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZXJNb3VzZVVwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5oYW5kbGVyTW91c2VPdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdXRvcGxheVN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheUl0ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5RGlyZWN0aW9uID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA9PSB0aGlzLnNsaWRlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IC0xXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlUHJldigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlU2xpZGUudmFsdWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b3BsYXlEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcy5zZXR0aW5ncy5pbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0b3BsYXlTdG9wKCl7XHJcbiAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9wbGF5SXRlcnZhbCk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAga2V5Q29udHJvbCgpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZXJLZXlDb250cm9sID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAzOSkgeyB0aGlzLnNsaWRlTmV4dCgpIH07XHJcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMzcpIHsgdGhpcy5zbGlkZVByZXYoKSB9O1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZXJLZXlDb250cm9sKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZXMoKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcnJvd3MpIHRoaXMuYWRkQXJyb3dzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mua2V5Q29udHJvbCkgdGhpcy5rZXlDb250cm9sKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZHJhZ2dhYmxlKSB0aGlzLmRyYWcoKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hdXRvcGxheSkgdGhpcy5hdXRvcGxheVN0YXJ0KCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==