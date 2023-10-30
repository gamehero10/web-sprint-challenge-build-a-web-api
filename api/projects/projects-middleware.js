// add middlewares here related to projects
const Project = require('./projects-model');

function handleError(err, req, res) {
    res.status(err.status || 500).json({
      message: err.message
    })
}

async function validateProjectId(req, res, next) {
    try {
      const project = await Project.get(req.params.id);
      if(!project) {
         res.status(404).json({ message: "project not found"});
      } else { 
         req.project = project;
         next();
      }
    } catch(err) {
      res.status(500).json({ message: "problem finding project"});
    }  
}


function validateProject(req, res, next) {
    const { name, description } = req.body;
    if(!name ||  !description ) {
        res.status(400).json({ message: "missing required notes and description field"});
    } else {
      next();
    }
}

function validateUpdatedProject(req, res, next) {
    const {name, description, completed} = req.body;
    if(!name || !description || completed === undefined) {
        res.status(400).json({ message: "The post was not correctly or completely updated"});
    } else {
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateUpdatedProject,
    handleError
}
