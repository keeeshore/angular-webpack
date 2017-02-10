/**
 * Created by balank on 8/02/2017.
 */
import { CarouselItem } from './CarouselItem';
import {CarouselInterface} from "./CarouselInterface";
import {CarouselComponent} from "./CarouselComponent";

export abstract class CarouselContainer implements CarouselInterface {

    public static id: number = 0;

    currIndex:number = 0;

    carouselComponent:CarouselComponent;

    public static carouselComponent:CarouselComponent;

    public setComponent (carouselComponent:CarouselComponent) {
        console.log('setComponent::CarouselContainer>>setComponent');
        CarouselContainer.carouselComponent = carouselComponent;
    }

    public setItem (item:CarouselItem) {
        let carouselComp = CarouselContainer.carouselComponent;
        if (carouselComp) {
            console.log('setItem::CarouselContainer>>setItem, total = ', carouselComp.items.length);
            console.log('setItem::CarouselContainer>>id = ', CarouselContainer.id);
            CarouselContainer.id += 1;
            let currIndex = carouselComp.currIndex;
            carouselComp.items.push(item);
            if (carouselComp.items[currIndex]) {
                carouselComp.items[currIndex].isActive = true;
            }
        } else {
            console.log('No Carousel component set...');
        }
    }

}
