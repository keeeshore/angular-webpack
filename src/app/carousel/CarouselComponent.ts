/**
 * Created by balank on 8/02/2017.
 */
import { Component } from '@angular/core';
import { CarouselItemComponent } from './CarouselItemComponent';
import {CarouselItem} from "./CarouselItem";

@Component({
    selector: 'carousel-component',
    templateUrl: './carousel-component.html'
})

export class CarouselComponent {
    
    public isAnimActive:boolean = false;

    public items:Array<CarouselItemComponent> = [];

    constructor () {
        debugger;
        console.log('carousel component init...');
    }

    public next () {
        console.log('next called...');
    }

    public prev () {
        console.log('prev called...');
    }

}