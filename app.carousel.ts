/**
 * Created by balank on 8/02/2017.
 */
import {Component, OnInit, AfterViewInit, ViewChildren, AfterViewChecked, QueryList} from '@angular/core';
import {ApiService} from "./app.apiservice";
import {CarouselComponent} from "./carousel/CarouselComponent";
import {DialogService} from "./dialog/DialogService";

@Component({
    selector: 'app-carousel-container',
    templateUrl: './app.carousel.html',
    providers: [ ApiService]
})

export class AppCarousel implements OnInit, AfterViewInit, AfterViewChecked {

    @ViewChildren(CarouselComponent) carouselComponents:QueryList<CarouselComponent>;

    public activeIndex:number = 1;

    public carouselComponent:CarouselComponent;

    public carouselData:Array<any> = [];

    constructor (private apiService:ApiService, private dialogService:DialogService) {
        console.log('AppCarousel init...');
    }

    ngOnInit ():void {
        console.log('AppCarousel::ngOnInit>');
    }

    ngAfterViewInit ():void {
        console.log('AppCarousel::ngAfterViewInit>');
    }

    ngAfterViewChecked ():void {
        //console.log('AppCarousel::ngAfterViewChecked>', this.carouselComponent);
        this.carouselComponent = this.carouselComponents.first;
    }

    openDialog (id:string) {
        console.log('AppCarousel::openDialog');
        this.dialogService.openModal(id);
    }

    public getPosts():void {
        debugger;
        //this.carouselComponent = this.carouselComponents.first;
        //console.log('AppCarousel::getPosts 1 >', this.carouselComponent.uid);
        let k = 0;
        while (k < 8) {
            console.log('push data to carouselData');
            this.carouselData.push({ name:'name-'+ (k + 1), head: 'head-'+ (k + 1)});
            k++;
        }
        /*let scope = this;
        this.apiService.fetch('http://localhost:4000/api/schools/get').subscribe((res: any) => {
            if (res && res.schools) {
                let i = 0;
                while (i < res.schools.length) {
                    let item:CarouselItem = new CarouselItem();
                    item.data = res.schools[i];
                    //scope.carouselComponent.items.push(item);
                    i++;
                }
            }
        });*/
        //TODO: timeout???
        //var self = this;
        //setTimeout(()=>{
            //console.log('setting setActiveIndex now.');
            //self.carouselComponent.setActiveIndex(this.activeIndex);
        //}, 0);
    }

    public addOne () {
        let data = { name:'name-'+this.carouselData.length, head: 'head-'+this.carouselData.length };
        this.carouselData.push(data);
    }


}
