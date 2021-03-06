import { Application } from 'express';
import express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
import { appConfig } from './config/index';
if (!appConfig.parseServer && appConfig.parseServer) {
    console.log('Config not found');
}
var api = new ParseServer({
    databaseURI: appConfig.parseServer.databaseURI,
    cloud: __dirname + appConfig.parseServer.cloud,
    appId: appConfig.parseServer.appId,
    masterKey: appConfig.parseServer.masterKey,
    serverURL: appConfig.parseServer.serverURL,
    liveQuery: appConfig.parseServer.liveQuery
});

// var typedoc = require('typedoc');
// import {Decorator} from 'typedoc';
// var appTD = new typedoc.Application();
// console.log(appTD);

var dashboard = new ParseDashboard({
    apps: [{
        serverURL: appConfig.parseServer.serverURL,
        appId: appConfig.parseServer.appId,
        masterKey: appConfig.parseServer.masterKey,
        appName: appConfig.parseServer.appName
    }],
    users: [{
        user: 'root',
        pass: 'r00t'
    }]
}, { allowInsecureHTTP: true });

var app: Application = express();

// Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = '/parse';
app.use(mountPath, api);

app.use('/-board', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
    res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get('/test', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

var httpServer = require('http').createServer(app);
httpServer.listen(appConfig.parseServer.port, function () {
    console.log('parse-server running on port ' + appConfig.parseServer.port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
