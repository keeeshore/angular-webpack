/**
 * Created by balank on 8/02/2017.
 */
import { CarouselItemComponent } from './CarouselItemComponent';

export abstract class CarouselItem {

    public id: number = 0;

    public currIndex:number = 0;

    public items:Array<CarouselItemComponent> = [];

    constructor (item:CarouselItemComponent) {
        console.log('abstract carouselItem init 1...', this.id);
        this.id = this.id + 1;
        this.items.push(item);
        console.log('abstract carouselItem init 2[id]=', this.id);
    }
}
