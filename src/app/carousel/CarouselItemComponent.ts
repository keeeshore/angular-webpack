/**
 * Created by balank on 8/02/2017.
 */
import { Component } from '@angular/core';
import { CarouselItem } from './CarouselItem'

@Component ({
    selector: 'carousel-item',
    templateUrl: './carousel-item.html'
})

export class CarouselItemComponent extends CarouselItem {

    public data:any =  {'itemId': '001', 'itemStr': 'test 1'};

    public itemData:string = '';

    constructor () {
        super(this);
        console.log('carousel item init..');
        debugger;
    }
}