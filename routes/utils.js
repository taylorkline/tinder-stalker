'use strict'; // eslint-disable-line strict

const RequestTinder = require('./RequestTinder');

const options = {
    hostname: 'api.gotinder.com',
    port: null,
    path: '/auth',
};

const RT = new RequestTinder(options);

const utils = {};

utils.getMyInfos = (facebookId, facebookToken, cb) => {
    /* eslint-disable camelcase */
    const credentials = {
        facebook_id: facebookId,
        facebook_token: facebookToken,
    };

    const headers = {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
    };

    RT.setHeaders(headers);
    RT.setPath('/auth');
    RT.post(credentials, (err, result) => {
        if (err) {
            return cb(err, null);
        }
        return cb(null, result);
    });
};

utils.getAllMyFBFriend = (tinderToken, cb) => {
    const headers = {
        'x-auth-token': tinderToken,
        'cache-control': 'no-cache',
    };
    RT.setPath('/group/friends');
    RT.setHeaders(headers);
    RT.get((err, result) => {
        if (err) {
            return cb(err, null);
        }
        return cb(null, result);
    });
};

utils.getUserInfo = (tinderToken, tinderId, cb) => {
    const headers = {
        'x-auth-token': tinderToken,
        'cache-control': 'no-cache',
    };
    RT.setPath(`/user/${tinderId}`);
    RT.setHeaders(headers);
    RT.get((err, result) => {
        if (err) {
            return cb(err, null);
        }
        return cb(null, result);
    });
};

module.exports = utils;
