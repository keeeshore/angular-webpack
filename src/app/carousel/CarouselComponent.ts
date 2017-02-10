/**
 * Created by balank on 8/02/2017.
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CarouselItem } from './CarouselItem';
import { CarouselContainer } from "./CarouselContainer";
import {CarouselInterface} from "./CarouselInterface";

@Component({
    selector: 'carousel-component',
    templateUrl: './carousel-component.html'
})

export class CarouselComponent extends CarouselContainer implements OnInit, AfterViewInit {
    
    public currIndex:number = 0;

    public items:Array<CarouselItem> = [];

    constructor () {
        super();
        console.log('constructor:::CarouselComponent');
    }

    ngOnInit () {
        super.setComponent(this);
        console.log('ngOnInit::CarouselComponent>this.items.length = ', this.items.length);
    }

    ngAfterViewInit () {
        console.log('ngAfterViewInit::CarouselComponent>this.items.length = ', this.items.length);
    }

    public next () {
        console.log('next called...' + this.items.length);
        let total:number = this.items.length;
        let currIndex:number = this.currIndex;
        let newIndex:number = currIndex + 1 >= total ? 0 : currIndex + 1;

        let currItem:CarouselItem = this.items[currIndex];
        if (currItem) {
            currItem.toggleActive();
        }
        
        let newItem:CarouselItem = this.items[newIndex];
        if (newItem) {
            newItem.toggleActive();
            this.currIndex = newIndex;
        }
        this.currIndex = newIndex;
    }

    public prev () {
        console.log('prev called...');
        let total:number = this.items.length;
        let currIndex:number = this.currIndex;
        let newIndex:number = currIndex - 1 < 0 ? total - 1 : currIndex - 1;

        let currItem:CarouselItem = this.items[currIndex];
        if (currItem) {
            currItem.toggleActive();
        }
        let newItem:CarouselItem = this.items[newIndex];
        if (newItem) {
            newItem.toggleActive();
            this.currIndex = newIndex;
        }
        this.currIndex = newIndex;
    }

}