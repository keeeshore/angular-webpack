import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './app.apiservice';
import { BaseModel } from './model/baseModel';
import { SchoolCollection } from './model/SchoolCollection';
import { SchoolModel } from './model/SchoolModel';
import { PostCollection } from './model/PostCollection';
import { PostModel } from './model/PostModel';
import * as moment from 'moment';

@Component({
	selector: 'app-posts',
	templateUrl: './app.posts.html',
	providers: [ApiService]
})

export class AppPostsComponent {

	public title: string = 'Test Title';

	private url: string = './responses/test_1.json';

	public DATE_TIME_FORMAT:string = 'DD-MM-YYYY, HH:mm';

	public message:string = '';

	private action: string = 'ADD';

	public limit:number = 10;

	private fromDate: string = moment().subtract(2, 'month').format(this.DATE_TIME_FORMAT);

	private toDate: string = moment().format(this.DATE_TIME_FORMAT);

	private accessToken: string = 'EAACEdEose0cBAFHN52Q504qRZB6IJnOibnLv9cWFj3KiHWloNrkJbx33m1xZBlFpTZBOJgOzzF2O1P8GiTMkp473pZCLhEWaFZCNEzu6Yh7YR6VSpASbS4m32cgXcOaFMgZAV21yubjsgdiaZBz8nPFw9pWGtJq86jKEpEnhd1kfgZDZD';

	public baseModel:BaseModel = new BaseModel();

	public schoolCollection:SchoolCollection = new SchoolCollection();

	public schoolModel:SchoolModel = new SchoolModel();

	public postCollection:PostCollection;

	constructor (private apiService: ApiService) {
		console.log('posts component init');
		this.getSchools();
		//this.getPosts();
	}

	public getSchools() {
		this.url = 'http://localhost:4000/api/schools/get';
		let now = moment().format('LLLL');
		console.log('now = ' + now);
		this.apiService.fetch(this.url).subscribe((res:SchoolCollection) => {
			this.schoolCollection.schools = res.schools;
			console.log('this.schoolCollection ' + JSON.stringify(this.schoolCollection));
		});
	}

	public updatePosts() {
		let url:string = 'http://localhost:4000/api/vimonisha/update/posts';
		let fromDate = moment().format(this.DATE_TIME_FORMAT);
		let toDate = moment().add(1, 'month').format(this.DATE_TIME_FORMAT);

		this.message = '';

		if (moment(this.fromDate, this.DATE_TIME_FORMAT).isValid() && moment(this.toDate, this.DATE_TIME_FORMAT).isValid()
			&& (moment(this.fromDate, this.DATE_TIME_FORMAT).isBefore(moment(this.toDate, this.DATE_TIME_FORMAT)))) {
			
			console.log('is valid date range', this.fromDate + ' : to : ' + this.toDate);
			fromDate = this.fromDate;
			toDate = this.toDate;

		} else {
			this.message = 'Invalid Date range......';
			return;
		}

		this.apiService.post(url, {
			'accessToken': this.accessToken,
			'since': fromDate,
			'until': toDate
		}).subscribe((res:any) => {
			//console.log('vimonisha updates posts JSON => ' + JSON.stringify(res));
			if (res.success) {
				this.fromDate = moment(res.until).add(1, 'm').format(this.DATE_TIME_FORMAT);
				this.postCollection = new PostCollection(res.id, res.posts, res.until);
			} else {
				this.message = res.error;
			}
	});
}

public getPosts(repeat:boolean) {
	var url = 'http://localhost:4000/api/vimonisha/get/posts';

	this.message = '';
	this.apiService.fetch(url).subscribe((res:PostCollection) => {
		//console.log('vimonisha posts recieved ' + JSON.stringify(res));
		if (this.postCollection && this.postCollection.posts) {
			this.postCollection.posts = [];
		}
		if (res.success) {
			this.postCollection = new PostCollection(res.id, res.posts, res.until);
		} else {
			this.message = 'no posts present';
		}

		if (repeat) {
			this.updatePosts();
		}

	});
}

public deleteSchool(model:SchoolModel) {
	console.log('deleteSchool called');
	this.apiService.post('http://localhost:4000/api/schools/delete', model).subscribe((res:any) => {
		console.log('response received in component for res ' + JSON.stringify(res));
		this.getSchools();

	});
}

public onEditSchool(model:SchoolModel) {
	console.log('.onEditSchool called');
	this.action = 'EDIT';
	this.schoolModel = model;
	debugger;
}
public cancelSchool(model:SchoolModel) {
	this.action = 'ADD';
	this.schoolModel = new SchoolModel();
}

public submitSchool() {
	if (this.action === 'EDIT') {
		this.apiService.post('http://localhost:4000/api/schools/update', this.schoolModel).subscribe((res:any) => {
			console.log('response received in component for res ' + JSON.stringify(res));
			this.schoolModel = new SchoolModel();
			this.action = 'ADD';
			this.getSchools();
		});
	} else {
		this.apiService.post('http://localhost:4000/api/schools/add', this.schoolModel).subscribe((res:any) => {
			console.log('response received in component for res ' + JSON.stringify(res));
			this.getSchools();
		});
	}
}

}