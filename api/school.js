/**
 * Created by balank on 5/12/2016.
 */
 module.exports = function (app, dbase, mongodb) {

        var moment = require('moment');
        var https = require("https");
        var DATE_TIME_FORMAT = 'DD-MM-YYYY, HH:mm';


        var schoolCollection = dbase.collection('schoolcollection');
        var classCollection = dbase.collection('classcollection');
        var postCollection = dbase.collection('postcollection');
     var vimonisha = dbase.collection('vimonisha');

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

 		app.post('/api/vimonisha/update/posts', function (req, res) {
			var until = moment().add(1, 'month').unix();
			var since = moment().unix();
			var data = '';
            var limit = 100;

			if (req.body) {
			    limit = req.body.limit || limit;

				if (req.body.until) {
					until = moment(req.body.until, DATE_TIME_FORMAT).unix();
					console.log('query.until present 2.....', until);
				}

				if (req.body.since) {
					since = moment(req.body.since, DATE_TIME_FORMAT).unix();
					console.log('query.since present 2.....', since);
				}

				if (req.body.accessToken) {
					access_token = req.body.accessToken;
					console.log('accessToken present .....', access_token);
				}
			}

			var query_params='id,posts.since(' + since + ').until(' + until + ').limit(' + limit + '){full_picture,description,created_time}';
			var get_url = fb_url + '?access_token=' + access_token + '&fields=' + query_params;
			console.log('get_url --------------------> \n' + get_url);
			console.log('---------------------------> \n');
			//https://graph.facebook.com/v2.8/vimonishaExhibitions?
            // access_token=*****&debug=all&fields=id%2Cname%2Cposts&format=json&method=get&pretty=0&suppress_http_code=1

			var request = https.get(get_url, function (response) {
				var buffer = '';

				response.on('data', function (chunk) {
					buffer += chunk;
				}); 

				response.on('end', function (err) {
					console.log(buffer);
					data = JSON.parse(buffer);
					console.log('data ====' + data);
					if (data && data.posts && data.posts.data) {
						postCollection.insert(data.posts.data, function (err, db) {
							if (err) {
								console.log('failed to add posts:::' + JSON.stringify(err));
								res.json({'success': false, 'err': JSON.stringify(err), 'data': data});
							} else {
							    if (data.posts.data.length > 0) {
							        until = data.posts.data[0].created_time;
                                }
								res.json({'success': true, 'id': data.id, 'posts': data.posts.data, 'until' : until});
							}
						});
					} else {
                        res.json({'success': false, 'err': data});
                    }
				});

			});

			request.end();

		});

        app.get('/api/vimonisha/get/posts', function (req, res) {
            console.log('get called...............');
            postCollection.find().sort({created_time: -1}).toArray(function(err, docs) {
                console.log('console.log::postCollection find().toArray()-----------' + JSON.stringify(docs));
                var until = moment().unix();
                var id = '';
                if (docs.length > 0) {
                    until = docs[0].created_time;
                    id = docs[0]._id;
                }
                res.json({'id': id, 'posts': docs, 'until' : until});
            });
        })

 	}();



 };