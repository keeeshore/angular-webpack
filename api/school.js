/**
 * Created by balank on 5/12/2016.
 */
 module.exports = function (app, dbase, mongodb) {

 	var moment = require('moment');
 	var https = require("https");


 	var schoolCollection = dbase.collection('schoolcollection');
 	var classCollection = dbase.collection('classcollection');
 	var postCollection = dbase.collection('postcollection');

 	var fb_url = 'https://graph.facebook.com/v2.8/vimonishaExhibitions';
 	var access_token = 'EAACEdEose0cBAC3lpGLUl2nX1bURYwMbfztjAxMrbQlfYtigAedYZB97ezE19I2QygTL5hSoLsJCoe6R3WaZBTvggudlrvZCWxOCr6aZAmSDzbTCXQabji60Gq46AnZC82CZBmknKDs9uXoIckmdukRmfJlOWOA2AuZA57CGBsnfQZDZD';

 	return function () {

 		console.log('INIT SCHOOL API');

 		app.post('/api/schools/add', function (req, res) {
 			console.log("POST----------------- api/schools/add =========== " + req.body);
 			schoolCollection.insert({
 				'name': req.body.name,
 				'type': req.body.type,
 				'head': req.body.head
 			}, function (err, db){
 				if (err) {
 					console.log('failed to add school');
 				}
 				res.json({'success': true});
 			});
 		});

 		app.post('/api/schools/delete', function (req, res) {
 			console.log("POST----------------- api/schools/delete =========== " + JSON.stringify(req.body));
 			var _id = new mongodb.ObjectId(req.body._id);
 			schoolCollection.findOneAndDelete({'_id': _id }, function (err, db){
 				if (err) {
 					console.log('failed to add school');
 				}
 				res.json({'success': true});
 			});
 		});

 		app.post('/api/schools/update', function (req, res) {
 			console.log("POST----------------- api/schools/update =========== " + req.body);
 			var _id = new mongodb.ObjectId(req.body._id);
 			schoolCollection.update(
 				{ '_id': _id },
 				{
 					$set: {
 						'name': req.body.name,
 						'type': req.body.type,
 						'head': req.body.head
 					}
 				},
 				function (err, db){
 					if (err) {
 						console.log('failed to update school' + err);
 					}
 					res.json({'success': true});
 				}
 				);
 		});

 		app.get('/api/schools/get', function (req, res) {
 			console.log("GET----------------- api/schools/add =========== " + req.body);
 			console.log('now = ' + moment().format('LLLL'));
 			schoolCollection.find().toArray(function(err, docs) {
 				console.log('console.log::schoolCollection find().toArray()-----------' + docs);
 				res.json({'schools': docs});
 			});
 		});

 		app.get('/api/vimonisha/posts', function (req, res) {
			//.since(1479701326).until(1484971726)
			var until = moment().subtract(1, 'month').unix();
			var since = moment().unix();
			var data = '';

			if (req.query) {
				if (req.query.until) { 
					until = moment(req.query.until, 'DD-MM-YYYY').subtract(1, 'month').unix();
					console.log('query.until present 2.....', until);
				}

				if (req.query.since) {          
					since = moment(req.query.since, 'DD-MM-YYYY').unix();
					console.log('query.since present 2.....', since);
				}

				if (req.query.accessToken) {
					access_token = req.query.accessToken;
					console.log('accessToken present .....', access_token);
				}
			}            

			var query_params='id,posts.since(' + since + ').until(' + until + '){full_picture,description,created_time}';
			var get_url = fb_url + '?access_token=' + access_token + '&fields=' + query_params;
			console.log('get_url --------------------> \n' + get_url);
			console.log('---------------------------> \n');
			//https://graph.facebook.com/v2.8/vimonishaExhibitions?access_token=*****&debug=all&fields=id%2Cname%2Cposts&format=json&method=get&pretty=0&suppress_http_code=1

			var request = https.get(get_url, function (response) {
				var buffer = "",
				route;

				response.on("data", function (chunk) {
					buffer += chunk;
				}); 

				response.on("end", function (err) {
					// finished transferring data
					// dump the raw data
					console.log(buffer);
					data = JSON.parse(buffer);
					console.log('data ====' + data);

					if (data && data.posts && data.posts.data) {
						postCollection.insert(data.posts.data, function (err, db) {
							if (err) {
								console.log('failed to add posts:::' + JSON.stringify(err));
								res.json({'success': false, 'err': JSON.stringify(err), 'data': data});
							} else {
								res.json({'data': data});
							}
						});
					}

				});

			});

			request.end();

		});

 	}();



 };