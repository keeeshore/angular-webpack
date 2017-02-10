/**
 * Created by balank on 8/02/2017.
 */
import { Component } from '@angular/core';
import {ApiService} from "./app.apiservice";
import {CarouselInterface} from "./carousel/CarouselInterface";
import {CarouselComponent} from "./carousel/CarouselComponent";
import {CarouselItem} from "./carousel/CarouselItem";

@Component({
    selector: 'app-carousel-container',
    templateUrl: './app.carousel.html',
    providers: [ApiService]
})

export class AppCarousel implements CarouselInterface {

    public pageData:string = 'test-page-data';

    public currIndex:number = 0;

    public carouselComponent:CarouselComponent = new CarouselComponent();

    constructor (private apiService:ApiService) {
        console.log('AppCarousel init...');
    }

    public getPosts() {
        debugger;

        this.apiService.fetch('http://localhost:4000/api/vimonisha/get/posts').subscribe((res: any) => {
            if (res && res.posts) {
                let i = 0;
                while (i < res.posts.length) {
                    let item:CarouselItem = new CarouselItem();
                    item.data = res.posts[i];
                    this.carouselComponent.items.push(item);
                    i++;
                }
            }
        });
    }


}
