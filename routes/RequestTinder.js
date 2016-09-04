'use strict'; // eslint-disable-line strict

const qs = require('querystring');
const http = require('https');

// keepAlive:true enable us to send and receive multiple HTTP requests/responses
// using the same TCP
const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });

class RequestTinder {
    constructor(options) {
        const data = options || {};
        this.options = {
            hostname: data.hostname || null,
            port: data.port || null,
            agent,
        };
    }

    setHeaders(headers) {
        this.options.headers = headers || {};
    }

    setPath(path) {
        this.options.path = path || null;
    }

    get(cb) {
        this.options.method = 'get';
        const reqTinder = http.request(this.options, res => {
            const chunks = [];

            res.on('data', chunk => {
                chunks.push(chunk);
            });

            res.on('end', () => {
                const body = Buffer.concat(chunks);
                cb(null, JSON.parse(body.toString()));
            });

            res.on('error', err => {
                cb(err, null);
            });
        });

        reqTinder.on('error', err => {
            cb(err, null);
        });

        reqTinder.end();
    }

    post(data, cb) {
        this.options.method = 'post';
        const requestData = qs.stringify(data);

        const request = http.request(this.options, res => {
            const chunks = [];

            res.on('data', chunk => {
                chunks.push(chunk);
            });

            res.on('end', () => {
                const body = Buffer.concat(chunks);
                cb(null, JSON.parse(body.toString()));
            });

            res.on('error', err => {
                cb(err, null);
            });
        });

        request.on('error', err => {
            cb(err, null);
        });

        request.write(requestData);
        request.end();
    }
}

module.exports = RequestTinder;
