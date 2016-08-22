'use strict';
const http = require('https');
const qs = require('querystring');

const utils = {};

utils.getMyInfos = (facebookId, facebookToken, cb) => {
    /* eslint-disable camelcase */
    const credentials = {
        facebook_id: facebookId,
        facebook_token: facebookToken,
    };
    /* eslint-enable camelcase */
    const reqData = qs.stringify(credentials);

    const options = {
        method: 'POST',
        hostname: 'api.gotinder.com',
        port: null,
        path: '/auth',
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
        },
    };

    const reqTinder = http.request(options, res => {
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

    reqTinder.write(reqData);
    reqTinder.end();
};

utils.getAllMyFBFriend = (tinderToken, cb) => {
    const options = {
        method: 'GET',
        hostname: 'api.gotinder.com',
        port: null,
        path: '/group/friends',
        headers: {
            'x-auth-token': tinderToken,
            'cache-control': 'no-cache',
        },
    };
    const reqTinder = http.request(options, res => {
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
};

utils.getUserInfo = (tinderToken, tinderId, cb) => {
    const options = {
        method: 'GET',
        hostname: 'api.gotinder.com',
        port: null,
        path: `/user/${tinderId}`,
        headers: {
            'x-auth-token': tinderToken,
            'cache-control': 'no-cache',
        },
    };
    const reqTinder = http.request(options, res => {
        const chunks = [];

        res.on('data', chunk => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const body = Buffer.concat(chunks);
            let manonBody;
            try {
                manonBody = JSON.parse(body.toString());
            } catch (e) {
                console.log('manonerror',e);
                return cb(null, {});
            }
            return cb(null, manonBody);
        });

        res.on('error', err => {
            return cb(err, null);
        });
    });

    reqTinder.on('error', err => {
        cb(err, null);
    });

    reqTinder.end();
};

module.exports = utils;
