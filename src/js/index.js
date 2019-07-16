import { Gallery } from './slider';

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
let NewSlider = new Gallery(gallerySettings);
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
    NewSlider = new Gallery(gallerySettings);
    NewSlider.init();
    localStorage.setItem('settings', JSON.stringify(gallerySettings));
};

sliderControl.addEventListener('submit', setGallerySettings);
};


