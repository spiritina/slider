import { Gallery } from './slider';

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

let NewSlider = new Gallery(gallerySettings);
NewSlider.init();