import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {ApiService} from './app.apiservice';

@Component({
  selector: 'app-posts',
  templateUrl: './app.posts.html',
  providers: [ApiService]
})

export class AppPostsComponent {

	public data: string;

	public people: string;

	constructor (private apiService: ApiService) {
		console.log('posts component init');
		apiService.getHeroes('./responses/test_1.json').subscribe((res) => {
			console.log('response recieved in component for res ' + JSON.stringify(res));
		});
	}

}