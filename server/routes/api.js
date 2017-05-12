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

// Recurse through the file Contents object to pull out all text
let pullText = function(fileContents) {
    let files = []
    for (let i=0; i<fileContents.length; i++) {
        if (fileContents[i].hasOwnProperty('text')) {
            files.push(fileContents[i].text)
        } else if (fileContents[i].hasOwnProperty('content')) {
            files.push(pullText(fileContents[i].content))
        }
    }
    let squashedFiles= [].concat.apply([], files)
    return squashedFiles 
}

// Return all content for a given user. 
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
        
        // after all pubs found for contributor, look for versions
        models.sequelize.Promise.all(promises).then(function(pubs) {
            // filter out the discussions from pubs
            let filteredPubs = pubs.filter(function(pub) {
                if (pub && !pub.title.includes('Discussion')) {return pub}
            })

            let versionPromises= []
            filteredPubs.forEach(function(pub) {
                versionPromises.push(models.Version.findAll({
                    limit: 1,
                    where: {
                        pubId: pub.id
                    },
                    order: [['createdAt', 'DESC']]
                }))
            })
            
            // After all versions found, query for files
            models.sequelize.Promise.all(versionPromises).then(function(versions) {
                // squash the versions into one array
                let squashedVersions = [].concat.apply([], versions)
                let versionFilePromises = []
                squashedVersions.forEach(function(version) {
                    versionFilePromises.push(models.VersionFile.findAll({
                        where: {
                            versionId: version.id 
                        }
                    }))
                })

                // After find all versionfiles go to files
                models.sequelize.Promise.all(versionFilePromises).then(function(versionFiles) {
                    let squashed = [].concat.apply([], versionFiles)
                    let filePromises = []

                    squashed.forEach(function(versionFile) {
                        filePromises.push(models.File.findById(versionFile.fileId)) 
                    })
                    
                    // filter files and map to content
                    models.sequelize.Promise.all(filePromises).then(function(files) {
                        // filter files for main.ppub
                        let filteredFiles = files.filter(function(file) {
                            if (file.name == 'main.ppub'){ return file }
                        })
                        let fileContents = filteredFiles.map(function(file) {
                            return JSON.parse(file.content)
                        })
                        let textArray = pullText(fileContents)
                        res.send(textArray)
                    })
                })
            })
        })
    })
 })



module.exports = router;