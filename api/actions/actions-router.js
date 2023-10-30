// Write your "actions" router here!

const express = require('express');
const { validateActionId, validateAction, handleError} = require('./actions-middlware');





const Action = require('./actions-model');




const router = express.Router();

router.get('/', (req, res, next) => {
    // RETURN AN ARRAY WITH ALL THE ACTIONS
    
    Action.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(next);
  });

  router.get('/:id', validateActionId, (req, res) => {
  // RETURN THE ACTION OBJECT
  // this needs a middleware to verify action id
  
  res.json(req.action);
  });


  router.post('/', validateAction, (req, res, next) => {
    // RETURN THE ACTION OBJECT
   // this needs a middleware to verify action id

   Action.insert(req.body)
         .then(action => {
            res.status(201).json(action);
         })
         .catch(next);
  });

  router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    // RETURN THE FRESHLY UPDATED ACTION OBJECT
  // this needs a middleware to verify action id
  // and another middleware to check that the request body is valid

  Action.update(req.params.id, req.body)
         .then(() => {
            return Action.get(req.params.id);
         })
         .then(action => {
            res.status(200).json(action);
         })
         .catch(next);
  });

  router.delete('/:id', validateActionId,  (req, res, next) => {
     // RETURN THE FRESHLY DELETED ACTION OBJECT
    // this needs a middleware to verify action id
    
    Action.remove(req.params.id)
          .then(action => {
            res.status(200).json(action);
          })
          .catch(next);
  });


 







module.exports = router;