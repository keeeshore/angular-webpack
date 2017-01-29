import * as moment from 'moment';

export class PostModel {
	
	public full_picture:string;
	public created_time:string;
	public id:number;
	public description:string;

	constructor (obj:any) {
		console.log('post Model init.....');
		this.description = obj.description;
		this.full_picture = obj.full_picture;
		this.id = obj.id;
		this.setCreatedTime(obj.created_time);
	}

	public setCreatedTime (time: string) {
		this.created_time = moment(time).format('DD-MM-YYYY, hh:mm A');
	}

}