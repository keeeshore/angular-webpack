var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var compiler = webpack(config);

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var expressApp = express();
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/test';
var dbase;

MongoClient.connect(dbUrl, function (err, db) {

    if (!err) {
        console.log('connection is OK : ' + dbUrl);
        dbase = db;

        var expressServer = expressApp.listen(process.env.PORT || 4000, function () {
            var host = expressServer.address().address;
            var port = expressServer.address().port;
            console.log('expressApp listening at http://%s:%s', host, port);
        });

        var school = require('./api/school')(expressApp, dbase, mongodb);
        var classApi = require('./api/class')(expressApp, dbase, mongodb);
        var postsApi = require('./api/vimonisha')(expressApp, dbase, mongodb);
        
    } else {
        console.log('Unable to connect to : ' + dbUrl + ' error: ' + err);
    }

});

expressApp.use('/public', proxy(url.parse('http://localhost:8080/public')));

expressApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//expressApp.use(express.static('public'));
console.log("__dirname:" + __dirname);
expressApp.use(bodyParser.json()); // for parsing expressApplication/json

expressApp.get('/', function (req, res) {
    console.log("expressApp.get(/!*) =========== " + req.url);
    res.sendFile(__dirname + '/' + req.url + '.html');
});


var server = new WebpackDevServer(compiler, {
    contentBase: __dirname,
    historyApiFallback: true,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: '/public',
    stats: { colors: true },
    headers: { "Access-Control-Allow-Origin": "*" }
});
server.listen(8080);
