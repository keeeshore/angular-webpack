import { PostModel } from './PostModel';
import {DataType} from "./DataType";
import {DataTypeEnum} from './DataTypeEnum';

export class PostCollection implements DataType {

	public posts:Array<PostModel> = [];

	public id:number;

    public type:DataTypeEnum = DataTypeEnum.POST;

    public until:string;

	constructor (id:number, posts:Array<PostModel>, until:string) {
		console.log('PostCollection init.....');
		this.setId(id);
        this.until = until;
		this.addPosts(posts);
	}

	public setId (id:number) {
	    this.id = id;
    }

	public addPosts (posts:Array<PostModel>) {
        let postsTotal = posts.length;
        let i = 0;
        while (i < postsTotal) {
            console.log('adding posts[i] :: ', JSON.stringify(posts[i]));
            this.posts.push(new PostModel(posts[i]));
            i++;
        }
	}

}