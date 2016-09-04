const express = require('express');
const router = express.Router();
const http = require('https');
const utils = require('./utils');

const async = require('async');

// id : facebook_id  -- token : access_token
router.get('/:id/:token', (req, res) => {
    // res.json({facebook_id: req.params.id, access_token: req.params.token});
    const facebookId = req.params.id;
    const facebookToken = req.params.token;
    utils.getMyInfos(
      facebookId,
      facebookToken,
      (err, data) => {
          if (err) {
              console.log('ERROR', err);
          }
          const tinderToken = data.token;
          console.log('working', tinderToken);
          utils.getAllMyFBFriend(tinderToken, (err, data) => {
              if (err) {
                  console.log('ERROR2', err);
              }
              // foreach
              const users = data.results;

              async.map(users,
              (user, cb) => {
                  utils.getUserInfo(tinderToken, user.user_id, (err, data) => {
                      if (err) {
                          console.log('bigdeal', err);
                          return cb(err, null);
                      }
                      return cb(null, data.results);
                  });
              },
              (err, data) => {
                  if (err) {
                      console.log('ERROR3', err);
                  }
                  res.render('results', { data });
              });
          });
      });
});


module.exports = router;
