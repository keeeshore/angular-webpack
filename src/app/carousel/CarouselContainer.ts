/**
 * Created by balank on 8/02/2017.
 */
import { CarouselItemComponent } from './CarouselItemComponent';

export abstract class CarouselContainer {

    public static id: number = 0;

    public static currIndex:number = 0;

    public static items:Array<CarouselItemComponent> = [];

    constructor () {
    	console.log('carouselContainer init...');
        CarouselContainer.id += 1;
    }


    setItem (item:CarouselItemComponent) {
    	let currIndex = CarouselContainer.currIndex;
    	CarouselContainer.items.push(item);
    	if (CarouselContainer.items[currIndex]) {
    		CarouselContainer.items[currIndex].isActive = true;
    	}    	
    }

    static setActive (indexId:number) {
    	console.log('carousel container setActive called...');
    	let currIndex = CarouselContainer.currIndex;
    	CarouselContainer.items[currIndex].isActive = false;
    	CarouselContainer.items[indexId].isActive = true;
    	CarouselContainer.currIndex = indexId;
    }

}
