export class Gallery {
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