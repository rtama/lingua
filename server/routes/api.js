const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res) {
    models.User.findAll().then(function(users) {
        res.send(users);
    })
    // res.send({
    //     message: "Welcome to the API!"
    // })
    
});

module.exports = router;