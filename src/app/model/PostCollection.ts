import { PostModel } from './PostModel';

export class PostCollection {


	public posts:Array<PostModel> = [];

	public id:number;

	constructor (id:number, posts:Array<PostModel>) {
		console.log('PostCollection init.....');
		this.id = id;
		this.addPosts(posts);
	}

	public addPosts (posts:Array<PostModel>) {
		let postsTotal = posts.length;
		let i = 0;
		while (i < postsTotal) {
			console.log('adding posts[i] :: ', JSON.stringify(posts[i]));
			this.setPost(posts[i]);
			i++;
		}
	}

	public setPost (postModel:PostModel) {
		this.posts.push(new PostModel(postModel));
	}

}