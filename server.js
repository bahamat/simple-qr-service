#!/usr/bin/env node --abort-on-uncaught-exception

var restify = require('restify'),
    qr = require('qr-image');

function respond(req, res, next) {
    res.contentType = 'image/png';
    res.code = 200;
    var qr_png = qr.imageSync(req.params.message, { type: 'png' });
    res.header('Content-Length', qr_png.count);
    res.header('Content-Disposition', 'attachment; filename=qr.png');
    res.send(qr_png);
    console.log('%s %s', res.code, req.url);
    return (next);
}

var server = restify.createServer();

// server.use(restify.plugins.serveStatic());

server.get({path: '/qr/:message', version: '0.0.1'}, respond);
server.head({path: '/qr/:message', version: '0.0.1'}, respond);

server.get(/\/$/, restify.plugins.serveStatic({
    directory: './html',
    file: 'qr.html'
}));

server.listen(8080, '::', function serverListenCallback() {
    console.log('%s listening at %s', server.name, server.url);
});
