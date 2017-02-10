/**
 * Created by balank on 9/02/2017.
 */
import {Component, OnInit} from '@angular/core';
import { CarouselComponent } from './CarouselComponent';
import {CarouselContainer} from "./CarouselContainer";

@Component ({
    selector: 'carousel-item',
    templateUrl: './carousel-item.html'
})

export class CarouselItem extends CarouselContainer implements OnInit {

    public data:any =  {'test': 'none', 'itemId': '001', 'itemStr': 'test 1'};

    public isActive:boolean = false;



    ngOnInit () {
        console.log('ngOnInit:::item>setting item');
        super.setItem(this);
    }

    toggleActive () {
        this.isActive = !this.isActive;
    }

}