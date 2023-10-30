const Action = require('./actions-model');

function handleError(err, req, res) {
    res.status(err.status || 500).json({
      message: err.message
    })
  }


// add middlewares here related to actions
async function validateActionId(req, res, next) {
    try {
         const action = await Action.get(req.params.id);
         if(!action) {
            res.status(404).json({ message: "action not found"});
         }  else {
            req.action = action;
            next();
         }
    } catch(err) {
        res.status(500).json({ message: "problem finding action"});
    }
}


function validateAction(req, res, next) {
    const { description, notes } = req.body;
    if(!description || description.trim().length > 128 || !notes  ) {
        res.status(400).json({ message: "missing requred description and notes field"});
    } else {
       next();
    }
}

module.exports = {
    validateActionId,
    validateAction,
    handleError
}