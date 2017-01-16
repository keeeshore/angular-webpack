import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {ApiService} from './app.apiservice';
import {BaseModel} from './model/baseModel'

@Component({
  selector: 'app-posts',
  templateUrl: './app.posts.html',
  providers: [ApiService]
})

export class AppPostsComponent {

    public title: string = 'Test Title';

    private url: string = './responses/test_1.json';

    public data:BaseModel = new BaseModel();

	constructor (private apiService: ApiService) {
		console.log('posts component init');
        debugger;
        this.url = 'http://localhost:4000/api/schools/get';
		apiService.fetch(this.url).subscribe((res:BaseModel) => {
			console.log('response received in component for res ' + JSON.stringify(res));
            this.data = new BaseModel();
            this.data.test = res.test;
            this.data.tel = res.tel;
            console.log('this.data ' + JSON.stringify(this.data));
		});
	}

}