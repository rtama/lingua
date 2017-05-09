const express = require('express');
const router = express.Router();
const models = require('../models');

// Api call get all users
router.get('/', function(req, res) {
    models.User.findAll().then(function(users) {
        res.send(users);
    }).catch(function(err) {
        return res.status(500).json(err.message);
    })
});

// Get user with userid 
router.get('/user/:userid', function(req, res) {
    models.User.findById(req.params.userid).then(function(user) {
        res.send(user);
    }).catch(function(err) {
        return res.status(500).json(err.message);
    })
});

module.exports = router;