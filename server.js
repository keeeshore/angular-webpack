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

    if (err) {
        console.log('Unable to connect to : ' + dbUrl + ' error: ' + err);
    } else {

        console.log('connection is OK : ' + dbUrl);
        dbase = db;

        var expressServer = expressApp.listen(process.env.PORT || 4000, function () {
            var host = expressServer.address().address;
            var port = expressServer.address().port;
            console.log('expressApp listening at http://%s:%s', host, port);
        });

        expressApp.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        //expressApp.use('/', proxy(url.parse('http://localhost:8080/')));

        //expressApp.use(express.static('public'));
        console.log("__dirname:" + __dirname);
        expressApp.use(bodyParser.json()); // for parsing expressApplication/json

        var schoolApi = require('./api/school')(expressApp, dbase, mongodb);
        var classApi = require('./api/class')(expressApp, dbase, mongodb);
        var postsApi = require('./api/vimonisha')(expressApp, dbase, mongodb);

    }

});


var server = new WebpackDevServer(compiler, {
    contentBase: __dirname,
    historyApiFallback: true,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: '',
    stats: { colors: true }
});
server.listen(8080);
