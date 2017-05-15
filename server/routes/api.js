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
// Sets text to lower case
let pullText = function(fileContents) {
    let files = []
    for (let i=0; i<fileContents.length; i++) {
        if (fileContents[i].hasOwnProperty('text')) {
            files.push(fileContents[i].text.toLowerCase())
        } else if (fileContents[i].hasOwnProperty('content')) {
            files.push(pullText(fileContents[i].content))
        }
    }
    let squashedFiles= [].concat.apply([], files)
    return squashedFiles 
}

// Get common contributors
router.get('/connections/:userid', function(req, res) {
    models.Contributor.findAll({
        where: {
            userId: req.params.userid
        }
    }).then(function(contributors) {
        let promises = []
        contributors.forEach(function(contributor) {
            promises.push(models.Pub.find({
                where: {
                    id: contributor.pubId,
                    isPublished: true
                }
            }))
        })

        // Wait for promises to return with all pubs
        models.sequelize.Promise.all(promises).then(function(pubs) {
            // All pubs that userid is a contributor to
            let definedPubs = pubs.filter(function(pub) {
                return pub
            })
            
            let pubPromises = []
            definedPubs.forEach(function(pub) {
                pubPromises.push(models.Contributor.findAll({
                    where: {
                        pubId: pub.id,
                        canEdit: true
                    }
                }))
            })
            
            models.sequelize.Promise.all(pubPromises).then(function(newContributors) {
                let squashedContributors= [].concat.apply([], newContributors)
                let userids = squashedContributors.map(function(squashedContributor) {
                    return squashedContributor.userId 
                })

                // create object to pull keys out of for faster runtime
                let getUnique = {}
                userids.forEach(function(id) {
                    if (!(id in getUnique)) {
                        getUnique[id] = 1
                    }
                })
                let uniques = Object.keys(getUnique).map(function(key) {
                    return parseInt(key)
                })
                
                let userPromises = []
                uniques.forEach(function(u) {
                    userPromises.push(models.User.findById(u))     
                })
                
                models.sequelize.Promise.all(userPromises).then(function(users) {
                    res.send(users) 
                })
            })
        })
    })
})

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
            }))
        })
        
        // after all pubs found for contributor, look for versions
        models.sequelize.Promise.all(promises).then(function(pubs) {
            // filter out the discussions from pubs
            let filteredPubs = pubs.filter(function(pub) {
                return (pub && !pub.title.includes('Discussion'))
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
                            return file.name == 'main.ppub'
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