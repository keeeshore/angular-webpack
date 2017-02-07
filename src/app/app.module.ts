import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app.header';
import { AppPostsComponent } from './app.posts';
import { SchoolComponent } from "./school/SchoolComponent";

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
    { path: 'test',
        redirectTo: '/posts',
        pathMatch: 'full'
    },
    { path: '',
        component: AppPostsComponent
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
		AppComponent, AppHeaderComponent, AppPostsComponent, SchoolComponent
	],
	bootstrap: [ AppComponent ],
	providers: [],
})

export class AppModule { }