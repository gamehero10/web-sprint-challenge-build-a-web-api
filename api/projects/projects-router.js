// Write your "projects" router here!
const express = require('express');
const {validateProjectId, validateProject, validateUpdatedProject, handleError} = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
     // RETURN AN ARRAY WITH ALL THE PROJECTS

     Project.get()
            .then(projects => {
                res.status(200).json(projects);
            })
            .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
  // RETURN THE ACTION OBJECT
  // this needs a middleware to verify action id

  res.json(req.project);
});

router.post('/', validateProject, (req, res, next) => {
    // RETURN THE NEWLY CREATED PROJECT OBJECT
    // this needs a middleware to check that the request body is valid
    Project.insert(req.body)
       .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
  });

  router.put('/:id', validateProjectId, validateUpdatedProject, (req, res, next) => {
    // RETURN THE FRESHLY UPDATED PROJECT OBJECT
    // this needs a middleware to verify project id
    // and another middleware to check that the request body is valid
    Project.update(req.params.id, req.body)
    .then(() => {
      return Project.get(req.params.id);
    })
    .then(project => {
      res.status(200).json(project);
    })
    .catch(next);
  });



  router.delete('/:id', validateProjectId, async (req, res, next) => {
    // RETURN THE FRESHLY DELETED USER OBJECT
    // this needs a middleware to verify user id
    try {
     await Project.remove(req.params.id);
     res.status(200).json(req.project);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).send(actions);
    })
    .catch(next)
  })























module.exports = router;