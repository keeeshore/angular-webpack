import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app.header';
import { AppPostsComponent } from './app.posts';
import  { ApiService } from './app.apiservice';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
    	JsonpModule
	],
	declarations: [
		AppComponent, AppHeaderComponent, AppPostsComponent
	],
	bootstrap: [ AppComponent ],
	providers: [],
})

export class AppModule { }