import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app.header';
import { AppPostsComponent } from './app.posts';
import { SchoolComponent } from "./school/SchoolComponent";
import { AppCarousel } from "./app.carousel";
import { CarouselComponent } from "./carousel/CarouselComponent";
import { CarouselItem } from "./carousel/CarouselItem";
import {DialogComponent} from "./dialog/DialogComponent";
import {DialogService} from "./dialog/DialogService";
import {ApiService} from "./app.apiservice";

const appRoutes: Routes = [
    {
        path: 'posts',
        component: AppPostsComponent
    },
    {
        path: 'school',
        component: SchoolComponent,
        data: { title: 'Heroes List' }
    },
    {
        path: 'carousel',
        component: AppCarousel,
        data: {
            id: 111,
            items: [
                {'itemId': '1', 'itemStr': 'test 1'},
                {'itemId': '2', 'itemStr': 'test 2'},
                {'itemId': '3', 'itemStr': 'test 3'},
                {'itemId': '4', 'itemStr': 'test 4'}
            ]
        }
    },
    { path: 'test',
        redirectTo: '/posts',
        pathMatch: 'full'
    },
    { path: '',
        component: AppCarousel
    },
    {
        path: '**',
        component: AppComponent
    }
];

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
    	JsonpModule,
    	FormsModule,
        RouterModule.forRoot(appRoutes)
	],
	declarations: [
		AppComponent,
        AppHeaderComponent,
        AppPostsComponent,
        SchoolComponent,
        CarouselItem,
        CarouselComponent,
        AppCarousel,
        DialogComponent
	],
	bootstrap: [ AppComponent ],
	providers: [ApiService, DialogService]
})

export class AppModule { }