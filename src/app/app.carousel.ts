/**
 * Created by balank on 8/02/2017.
 */
import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/CarouselComponent';

@Component({
    selector: 'app-carousel-container',
    templateUrl: './app.carousel.html'
})

export class AppCarousel {

    public pageData:string = 'test p data';

    constructor () {
        console.log('AppCarousel called...');
    }

}
