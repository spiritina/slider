export class Gallery {
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
            
            let img = this.slides[i].querySelector('img');
            let src = img.getAttribute('src');
            this.slides[i].style.backgroundImage = `url('${src}') `;
            this.slides[i].style.backgroundSize = 'cover';
            this.slides[i].style.backgroundPosition = 'center';
            img.remove();
            
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