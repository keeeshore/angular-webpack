/**
 * Created by balank on 8/02/2017.
 */
import { Component } from '@angular/core';
import { CarouselContainer } from './CarouselContainer';

@Component ({
    selector: 'carousel-item',
    templateUrl: './carousel-item.html'
})

export class CarouselItemComponent extends CarouselContainer {

    public data:any =  {'itemId': '001', 'itemStr': 'test 1'};

    public isActive:boolean = false;

    public itemData:string = '';

    constructor () {
        super();
        super.setItem(this);
        console.log('carousel item init..');
    }

    setDataStr (indexId:number) {
    	console.log('setDataStr called...');
    	this.data.itemStr = 'indexId' + indexId;
    }

    toggleActive () {
    	this.isActive = !this.isActive;
    }


}