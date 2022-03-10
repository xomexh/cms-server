const express = require('express');
const router = express.Router();

const {Project} = require('../models/models')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

router.get('/',async(req,res)=>{
    const projects =await Project.find()
    res.status(200).send(projects)
})

router.post('/',async(req,res)=>{
    const {name,startDate,members}=req.body;
    const projects = new Project({
        name:name,
        startDate:startDate,
        members:members
    })

    projects.save().then(()=>{
        res.status(200).send(`${name} has been added with members`)
    })
    
    

})

module.exports=router
