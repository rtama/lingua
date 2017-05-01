const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {
    models.User.findAll().then(function(users) {
        res.send(users);
    }).catch(function(err) {
        return res.status(500).json(err.message);
    })
});

module.exports = router;