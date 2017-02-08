/**
 * Created by balank on 8/02/2017.
 */
import { Component } from '@angular/core';
import { CarouselItemComponent } from './CarouselItemComponent';
import { CarouselContainer } from "./CarouselContainer";

@Component({
    selector: 'carousel-component',
    templateUrl: './carousel-component.html'
})

export class CarouselComponent {
    
    public isAnimActive:boolean = false;

    public items:Array<CarouselItemComponent> = [];

    constructor () {
        CarouselContainer.currIndex = 1;
        console.log('carousel component init...', CarouselContainer.currIndex);
    }

    public next () {
        console.log('next called...' + CarouselContainer.items.length);
        debugger;
        let currIndex:number = CarouselContainer.currIndex;
        let newIndex:number = CarouselContainer.currIndex + 1;
        console.log('currIndex before = ' + currIndex);
        let item:CarouselItemComponent = CarouselContainer.items[currIndex];
        if (item) {
            console.log('item exists = ' + currIndex);
            item.toggleActive();
            item.setDataStr(currIndex);
        }
        
        let newItem:CarouselItemComponent = CarouselContainer.items[newIndex];
        if (newItem) {
            console.log('item exists = ' + newIndex);
            newItem.toggleActive();
            newItem.setDataStr(newIndex);
            CarouselContainer.currIndex = newIndex;
        }

        console.log('currIndex after = ' + currIndex);
    }

    public prev () {
        console.log('prev called...');
    }

}