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
            keyControlUnable: false,
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
        if (this.settings.keyControl){
            this.slider.removeEventListener('mouseout', handlerMouseOut);
            
            this.slider.removeEventListener('mouseover', handlerMouseIn);
            document.body.removeEventListener('click', handlerClick);  
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
                if(this.settings.autoplay)this.autoplayStart();
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
        
        let handlerKeyControl = (e) => {
            console.log(this.settings.keyControlUnable);
            console.log(e);
           if(this.settings.keyControlUnable){ 
            if (e.keyCode == 39) { this.slideNext() };
            if (e.keyCode == 37) { this.slidePrev() };
            
        }}
        document.body.addEventListener('keydown', handlerKeyControl)
        
    }


    init() {
        console.log(this.settings)
        this.getSettings();
        this.setStyles();
        if (this.settings.arrows) this.addArrows();
        if (this.settings.keyControl) {
            let handlerMouseIn = (e) =>{
                this.settings.keyControlUnable = true;
            }
            let handlerMouseOut = (e) =>{
                this.settings.keyControlUnable = false;
            }
            
            let handlerClick = (e) => {
            if(e.target.closest(this.settings.selector)){
                this.settings.keyControlUnable = true;
            } else (this.keyControlUnable = false);
            };
            this.slider.addEventListener('mouseout', handlerMouseOut);
            
            this.slider.addEventListener('mouseover', handlerMouseIn);
            document.body.addEventListener('click', handlerClick);  
            this.keyControl();
        }
        if (this.settings.draggable) this.drag();
        if (this.settings.autoplay) this.autoplayStart();
      
    }

    
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW1DOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxNO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlCQUF5QjtBQUNuRSwyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQU87QUFDM0I7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrQ0FBTztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL0RBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELElBQUk7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsbURBQW1EO0FBQy9HO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLDREQUE0RCxtREFBbUQ7QUFDL0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLHdEQUF3RCxtREFBbUQ7QUFDM0c7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxrSEFBa0g7QUFDMUw7QUFDQTtBQUNBLGE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msa0RBQWtELE9BQU87QUFDeEc7QUFDQTtBQUNBLGE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQSx5QztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDO0FBQ0Esa0NBQWtDO0FBQ2xDLGtDQUFrQzs7QUFFbEM7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0Esa0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0EsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IEdhbGxlcnkgfSBmcm9tICcuL3NsaWRlcic7XHJcblxyXG5sZXQgZ2FsbGVyeVNldHRpbmdzID0ge307XHJcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBsZXQgc2xpZGVyQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXJDb250cm9sJyk7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2V0dGluZ3MnKSl7XHJcbiAgICAgICAgZ2FsbGVyeVNldHRpbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2V0dGluZ3MnKSk7XHJcbiAgICAgICAgc2V0SW5wdXRzKCk7XHJcbiAgICAgICAgXHJcbiAgICB9IGVsc2V7IFxyXG4gICAgICAgIGdhbGxlcnlTZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2FsbGVyeScsXHJcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjonLmdhbGxlcnktaXRlbScsXHJcbiAgICAgICAgICAgIGludGVydmFsOiAzMDAwLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgICAgICAgYmVmb3JlQ3JlYXRlOiBmdW5jdGlvbigpIHsgY29uc29sZS5sb2coJ2NyZWF0ZWQnKSB9LFxyXG4gICAgICAgICAgICAgICAgb25TTGlkZUNoYW5nZTpmdW5jdGlvbiAoKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjaGVuZ2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hY3RpdmVTbGlkZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGtleUNvbnRyb2w6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sczogdHJ1ZSxcclxuICAgICAgICAgICAgYXJyb3dzOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRJbnB1dHMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gc2V0SW5wdXRzKCl7XHJcbiAgICAgICAgbGV0IGNoZWNrYm94ZXMgPSBzbGlkZXJDb250cm9sLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT0nY2hlY2tib3gnXVwiKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IGNoZWNrYm94ZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGNoZWNrYm94ZXNbaV0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgICAgICAgIGNoZWNrYm94ZXNbaV0uY2hlY2tlZCA9IGdhbGxlcnlTZXR0aW5nc1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGludGVydmFsID0gc2xpZGVyQ29udHJvbC5xdWVyeVNlbGVjdG9yKFwiW3R5cGU9J251bWJlciddXCIpO1xyXG4gICAgICAgIGludGVydmFsLnZhbHVlID0gZ2FsbGVyeVNldHRpbmdzLmludGVydmFsO1xyXG4gICAgfVxyXG5sZXQgTmV3U2xpZGVyID0gbmV3IEdhbGxlcnkoZ2FsbGVyeVNldHRpbmdzKTtcclxuTmV3U2xpZGVyLmluaXQoKTtcclxuXHJcblxyXG5sZXQgc2V0R2FsbGVyeVNldHRpbmdzID0gKGUpPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IGNoZWNrYm94ZXMgPSBzbGlkZXJDb250cm9sLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdHlwZT0nY2hlY2tib3gnXVwiKTtcclxuICAgIGZvcihsZXQgaT0wOyBpIDwgY2hlY2tib3hlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBjaGVja2JveGVzW2ldLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICAgIGdhbGxlcnlTZXR0aW5nc1tuYW1lXSA9IGNoZWNrYm94ZXNbaV0uY2hlY2tlZDtcclxuICAgIH1cclxuICAgIGxldCBpbnRlcnZhbCA9IHBhcnNlRmxvYXQoc2xpZGVyQ29udHJvbC5xdWVyeVNlbGVjdG9yKFwiW3R5cGU9J251bWJlciddXCIpLnZhbHVlKTtcclxuICAgIGlmIChpc05hTihpbnRlcnZhbCkpe1xyXG4gICAgICAgIGdhbGxlcnlTZXR0aW5ncy5pbnRlcnZhbCA9IDIwMDBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2FsbGVyeVNldHRpbmdzLmludGVydmFsID0gaW50ZXJ2YWxcclxuICAgIH1cclxuICAgIE5ld1NsaWRlci5kZXN0cm95KCk7XHJcbiAgICBOZXdTbGlkZXIgPSBuZXcgR2FsbGVyeShnYWxsZXJ5U2V0dGluZ3MpO1xyXG4gICAgTmV3U2xpZGVyLmluaXQoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXR0aW5ncycsIEpTT04uc3RyaW5naWZ5KGdhbGxlcnlTZXR0aW5ncykpO1xyXG59O1xyXG5cclxuc2xpZGVyQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzZXRHYWxsZXJ5U2V0dGluZ3MpO1xyXG59O1xyXG5cclxuXHJcbiIsImV4cG9ydCBjbGFzcyBHYWxsZXJ5IHtcclxuICAgIGNvbnN0cnVjdG9yKG9iaikge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiB0cnVlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBrZXlDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAga2V5Q29udHJvbFVuYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGludGVydmFsOiAyMDAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKXtcclxuICAgICAgICB0aGlzLnNldHRpbmdzW2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3Muc2VsZWN0b3IpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVzID0gdGhpcy5zbGlkZXIucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNldHRpbmdzLml0ZW1TZWxlY3Rvcik7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZ1bmN0IGluIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tmdW5jdF0gPSB0aGlzLnNldHRpbmdzLmNhbGxiYWNrc1tmdW5jdF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tmdW5jdF0gPSB0aGlzLmNhbGxiYWNrc1tmdW5jdF0uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3MuYmVmb3JlQ3JlYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzLmJlZm9yZUNyZWF0ZSgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNldFN0eWxlcyA9IHRoaXMuc2V0U3R5bGVzLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5pbml0ID0gdGhpcy5pbml0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zbGlkZU5leHQgPSB0aGlzLnNsaWRlTmV4dC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVQcmV2ID0gdGhpcy5zbGlkZVByZXYuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZEFycm93cyA9IHRoaXMuYWRkQXJyb3dzLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRTd2lwZUxpc3RlbmVycyA9IHRoaXMuYWRkU3dpcGVMaXN0ZW5lcnMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmdvVG9TbGlkZSA9IHRoaXMuZ29Ub1NsaWRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5rZXlDb250cm9sID0gdGhpcy5rZXlDb250cm9sLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kcmFnID0gdGhpcy5kcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheVN0YXJ0ID0gdGhpcy5hdXRvcGxheVN0YXJ0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hdXRvcGxheVN0b3AgPSB0aGlzLmF1dG9wbGF5U3RvcC5iaW5kKHRoaXMpOyBcclxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSB0aGlzLmRlc3Ryb3kuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR0aW5ncygpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB7fTtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UgPSB0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0eWxlcygpe1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgICAgIHRoaXMuYXV0b3BsYXlEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLmhlaWdodCA9IHNjcmVlbi5oZWlnaHQgLyBzY3JlZW4ud2lkdGggKiB0aGlzLnNsaWRlci5jbGllbnRXaWR0aCArICdweCc7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyUmVzaXplID0gKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUuaGVpZ2h0ID0gc2NyZWVuLmhlaWdodCAvIHNjcmVlbi53aWR0aCAqIHRoaXMuc2xpZGVyLmNsaWVudFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVyUmVzaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtT3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5pdGVtT3V0cHV0LmNsYXNzTGlzdC5hZGQoJ2l0ZW0tb3V0cHV0Jyk7XHJcbiAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLndpZHRoID0gMTAwICogdGhpcy5zbGlkZXMubGVuZ3RoICsgJyUnO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250cm9scykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMuY2xhc3NMaXN0LmFkZCgnY29udHJvbHMnKTtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9scy5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyJywgdGhpcy5zZXR0aW5ncy5zZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3JjcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUud2lkdGggPSAoMTAwIC8gdGhpcy5zbGlkZXMubGVuZ3RoKSArICclJztcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uY2xhc3NMaXN0LmFkZCgnc2xpZGUtaXRlbScpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkZXNbaV0ucXVlcnlTZWxlY3RvcignaW1nJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzLnNsaWRlc1tpXS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgICAgIGxldCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Jjcy5wdXNoKHNyYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlc1tpXS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke3NyY30nKSBgO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnY292ZXInO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XHJcbiAgICAgICAgICAgICAgICBpbWcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xFbGVtLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2wtZWxlbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgY29udHJvbEVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlJywgaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmFwcGVuZENoaWxkKGNvbnRyb2xFbGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LmFwcGVuZENoaWxkKHRoaXMuc2xpZGVzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuaXRlbU91dHB1dCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlckNvbnJ0b2xzQ2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuc2xpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvVG9TbGlkZSgrZS50YXJnZXQuZGF0YXNldC5zbGlkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMuY29udHJvbHMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQ29ucnRvbHNDbGljayk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGFkZEFycm93cygpe1xyXG4gICAgICAgIHRoaXMubGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMubGVmdC5jbGFzc0xpc3QuYWRkKCdsZWZ0Jyk7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMucmlnaHQuY2xhc3NMaXN0LmFkZCgncmlnaHQnKTtcclxuICAgICAgICB0aGlzLnJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zbGlkZU5leHQpO1xyXG4gICAgICAgIHRoaXMubGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2xpZGVQcmV2KTtcclxuICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLmxlZnQpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKHRoaXMucmlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFN3aXBlTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGxldCBkZXRlY3RpbmcgPSBmYWxzZSwgeCwgZGVsdGEsIG5ld1gsIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhhbmRsZXJUb3VjaFN0YXJ0ID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggIT0gMSB8fCBzdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGV0ZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgICAgICAgICAgeCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlclRvdWNoTW92ZSA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghc3RhcnRlZCAmJiAhZGV0ZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICBkZWx0YSA9IHggLSBuZXdYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyVG91Y2hFbmQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlcy5pbmRleE9mKHRvdWNoKSA9PSAtMSB8fCAhc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZGVsdGEgPiAwID8gdGhpcy5zbGlkZU5leHQoKSA6IHRoaXMuc2xpZGVQcmV2KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlclRvdWNoU3RhcnQpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlclRvdWNoTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZXJUb3VjaEVuZCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzbGlkZU5leHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlU2xpZGUudmFsdWUgPCB0aGlzLnNsaWRlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2xpZGUudmFsdWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzLm9uU0xpZGVDaGFuZ2UpIHRoaXMuYWN0aXZlU2xpZGUub25TTGlkZUNoYW5nZSgpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1PdXRwdXQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstMTAwICogdGhpcy5hY3RpdmVTbGlkZS52YWx1ZSAvIHRoaXMuc2xpZGVzLmxlbmd0aH0lKWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGVQcmV2KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlLS07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrcy5vblNMaWRlQ2hhbmdlKSB7IHRoaXMuYWN0aXZlU2xpZGUub25TTGlkZUNoYW5nZSgpIH1cclxuICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCAqIHRoaXMuYWN0aXZlU2xpZGUudmFsdWUgLyB0aGlzLnNsaWRlcy5sZW5ndGh9JSlgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdvVG9TbGlkZShpbmRleCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGUudmFsdWUgPSBpbmRleDtcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3Mub25TTGlkZUNoYW5nZSkgeyB0aGlzLmFjdGl2ZVNsaWRlLm9uU0xpZGVDaGFuZ2UoKSB9XHJcbiAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LTEwMCAqIHRoaXMuYWN0aXZlU2xpZGUudmFsdWUgLyB0aGlzLnNsaWRlcy5sZW5ndGh9JSlgXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmF1dG9wbGF5U3RvcCgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlck1vdXNlRG93bik7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVyTW91c2VNb3ZlKTtcclxuICAgICAgICB0aGlzLnNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVyTW91c2VVcCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLmhhbmRsZXJNb3VzZU91dCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVyS2V5Q29udHJvbCk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlclJlc2l6ZSk7XHJcbiAgICAgICAgaWYodGhpcy5zZXR0aW5ncy5jb250cm9scyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJDb25ydG9sc0NsaWNrKTtcclxuICAgICAgICAgICAgbGV0IGNvbnRyb2xFbGVtID0gIHRoaXMuY29udHJvbHMuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbEVsZW0ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgY29udHJvbEVsZW1baV0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zZXR0aW5ncy5hcnJvd3Mpe1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zbGlkZU5leHQpO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNsaWRlUHJldik7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mua2V5Q29udHJvbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlck1vdXNlT3V0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZXJNb3VzZUluKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJDbGljayk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlclRvdWNoU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlclRvdWNoTW92ZSk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZXJUb3VjaEVuZCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuc2V0dGluZ3M7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuc2xpZGVOZXh0O1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNsaWRlUHJldjtcclxuICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5zcmNzW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUuZmxvYXQgPSAnY2xlYXIoYm90aCknO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlc1tpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlLWl0ZW0nKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXNbaV0uc3R5bGUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udHJvbHMucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBkcmFnKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRyYWdnYWJsZSkge1xyXG4gICAgICAgICAgICBsZXQgeCwgZGVsdGEsIG5ld1gsIHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyTW91c2VEb3duID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IGU7XHJcbiAgICAgICAgICAgICAgICB4ID0gdG91Y2gucGFnZVg7XHJcbiAgICAgICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b3BsYXlTdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyTW91c2VNb3ZlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdWNoID0gZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdYID0gdG91Y2gucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSB4IC0gbmV3WDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRlbHRhID4gMCAmJiB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlIDwgdGhpcy5zbGlkZXMubGVuZ3RoIC0gMSkgfHwgKGRlbHRhIDwgMCAmJiB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtT3V0cHV0LnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey0xMDAgKiB0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlIC8gdGhpcy5zbGlkZXMubGVuZ3RoIC0gZGVsdGEgKiAxMDAgLyAodGhpcy5zbGlkZXIuY2xpZW50V2lkdGggKiB0aGlzLnNsaWRlcy5sZW5ndGgpfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyTW91c2VVcCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91Y2ggPSBlO1xyXG4gICAgICAgICAgICAgICAgbmV3WCA9IHRvdWNoLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSB4IC0gbmV3WDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyBlYXNlLWluLW91dCc7XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEpID4gNTApIHsgZGVsdGEgPiAwID8gdGhpcy5zbGlkZU5leHQoKSA6IHRoaXMuc2xpZGVQcmV2KCkgfVxyXG4gICAgICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZXR0aW5ncy5hdXRvcGxheSl0aGlzLmF1dG9wbGF5U3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJNb3VzZU91dCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU91dHB1dC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyBlYXNlLWluLW91dCc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhKSA+IDUwKSB7IGRlbHRhID4gMCA/IHRoaXMuc2xpZGVOZXh0KCkgOiB0aGlzLnNsaWRlUHJldigpIH0gZWxzZSB7IHRoaXMuZ29Ub1NsaWRlKHRoaXMuYWN0aXZlU2xpZGUudmFsdWUpIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlck1vdXNlRG93bik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZXJNb3VzZU1vdmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlck1vdXNlVXApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLmhhbmRsZXJNb3VzZU91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF1dG9wbGF5U3RhcnQoKXtcclxuICAgICAgICB0aGlzLmF1dG9wbGF5SXRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXlEaXJlY3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZU5leHQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlLnZhbHVlID09IHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9wbGF5RGlyZWN0aW9uID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVQcmV2KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVTbGlkZS52YWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvcGxheURpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNldHRpbmdzLmludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRvcGxheVN0b3AoKXtcclxuICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b3BsYXlJdGVydmFsKTsgICBcclxuICAgIH1cclxuXHJcbiAgICBrZXlDb250cm9sKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBoYW5kbGVyS2V5Q29udHJvbCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2V0dGluZ3Mua2V5Q29udHJvbFVuYWJsZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgIGlmKHRoaXMuc2V0dGluZ3Mua2V5Q29udHJvbFVuYWJsZSl7IFxyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDM5KSB7IHRoaXMuc2xpZGVOZXh0KCkgfTtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAzNykgeyB0aGlzLnNsaWRlUHJldigpIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcktleUNvbnRyb2wpXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZXR0aW5ncylcclxuICAgICAgICB0aGlzLmdldFNldHRpbmdzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZXMoKTtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5hcnJvd3MpIHRoaXMuYWRkQXJyb3dzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Mua2V5Q29udHJvbCkge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlck1vdXNlSW4gPSAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmtleUNvbnRyb2xVbmFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGVyTW91c2VPdXQgPSAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmtleUNvbnRyb2xVbmFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGhhbmRsZXJDbGljayA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QodGhpcy5zZXR0aW5ncy5zZWxlY3Rvcikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5rZXlDb250cm9sVW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlICh0aGlzLmtleUNvbnRyb2xVbmFibGUgPSBmYWxzZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlck1vdXNlT3V0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZXJNb3VzZUluKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJDbGljayk7ICBcclxuICAgICAgICAgICAgdGhpcy5rZXlDb250cm9sKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRyYWdnYWJsZSkgdGhpcy5kcmFnKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuYXV0b3BsYXkpIHRoaXMuYXV0b3BsYXlTdGFydCgpO1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxufSJdLCJzb3VyY2VSb290IjoiIn0=