#!/usr/bin/env node --abort-on-uncaught-exception

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright 2024 Brianna Bennett <brie@zonename.org>
 */

var restify = require('restify'),
    qr = require('qr-image');

function respond(req, res, next) {
    res.setHeader('Content-Type', 'image/png');
    res.code = 200;
    var qr_png = qr.imageSync(req.params.message, { type: 'png' });
    res.header('Content-Length', qr_png.count);
    res.end(qr_png);
    console.log('%s %s %s', res.code, req.method, req.url);
    return (next);
}

var server = restify.createServer();

server.get({path: '/qr/:message', version: '0.0.1'}, respond);
server.head({path: '/qr/:message', version: '0.0.1'}, respond);

server.get(/\/$/, restify.plugins.serveStatic({
    directory: './html',
    file: 'qr.html'
}));

server.listen(8080, '::', function serverListenCallback() {
    console.log('%s listening at %s', server.name, server.url);
});
