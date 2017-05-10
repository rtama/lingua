const express = require('express');
const router = express.Router();
const models = require('../models');
// const Promise = require('bluebird');

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

router.get('/pubs/user/:userid', function(req, res) {
    models.Contributor.findAll({
        where: {
            userId: req.params.userid,
            isAuthor: true
        }
    }).then(function(contributors) {
        //push all the nested query promises into array for promise all
        let promises = []
        contributors.forEach(function(contributor) {
            promises.push(models.Pub.find({
                where: {
                    id: contributor.pubId,
                    isPublished: true
                }
            }));
        })
        
        models.sequelize.Promise.all(promises).then(function(pubs) {
            let names = pubs.filter(function(pub) {
                if (pub) {return pub}
            }).map(function(pub) {
                if (pub) {
                    return pub.title
                }
            }) 
            res.send(names);
        })
    })
        
        // contributors.map(function(contributor) {
        //     models.Version.findAll({
        //         where: {
        //             pubId: contributor.pubId
        //         }
        //     })
        //     contributor.pubId
        // })
        // for (let i=0; i<contributors.length; i++) {

        //     contributors[i].pubId
        // }
        // res.send(contributors);
        // res.send(contributors.forEach(function(contributor) {
        //     let pub = models.Pub.findById(contributor.pubId).then(function(pub) {
        //         return pub;
        //     });
        //     return pub;
        // }))
 });

module.exports = router;