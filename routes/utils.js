const http = require('https');
const qs = require('querystring');

const utils = {};

utils.getMyInfos = (facebook_id, facebook_token, cb) => {
    const req_data = qs.stringify({
        facebook_id: facebook_id,
        facebook_token: facebook_token
     });

    const options = {
        "method": "POST",
        "hostname": "api.gotinder.com",
        "port": null,
        "path": "/auth",
        "headers": {
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded"
        }
    };

    const reqTinder = http.request(options, function (res) {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const body = Buffer.concat(chunks);
          cb(null, JSON.parse(body.toString()));
        });

        res.on('error', (err) => {
          cb(err, null);
        });

    });

    reqTinder.on('error', (err) => {
        cb(err, null);
    });

    reqTinder.write(req_data)
    reqTinder.end();
};

utils.getAllMyFBFriend = (tinder_token, cb) => {
    const options = {
        "method": "GET",
        "hostname": "api.gotinder.com",
        "port": null,
        "path": "/group/friends",
        "headers": {
            "x-auth-token": tinder_token,
            "cache-control": "no-cache",
        }
    };
    const reqTinder = http.request(options, function (res) {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const body = Buffer.concat(chunks);
          cb(null, JSON.parse(body.toString()));
        });

        res.on('error', (err) => {
          cb(err, null);
        });
    });

    reqTinder.on('error', (err) => {
        cb(err, null);
    });

    reqTinder.end();
}

utils.getUserInfo = (tinder_token, tinder_id, cb) => {
    const options = {
        "method": "GET",
        "hostname": "api.gotinder.com",
        "port": null,
        "path": "/user/"+tinder_id,
        "headers": {
            "x-auth-token": tinder_token,
            "cache-control": "no-cache",
        }
    };

    const reqTinder = http.request(options, function (res) {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const body = Buffer.concat(chunks);
          cb(null, JSON.parse(body.toString()));
        });

        res.on('error', (err) => {
            cb(err, null)
        });

    });

    reqTinder.on('error', (err) => {
        cb(err, null);
    });

    reqTinder.end();
}

module.exports = utils
