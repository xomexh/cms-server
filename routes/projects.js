const express = require('express');
const router = express.Router();

const {Project,Employee} = require('../models/models')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

router.get('/:name',async(req,res)=>{

    if(req.params.name==='all'){
        const projects =await Project.find()
        return res.status(200).send(projects)
    }

    const projects=await Project.findOne({name:req.params.name})

    if(!projects){
        return res.status(400).send("No such Project exists")
    }

    return res.status(200).send(projects)
    
})

router.post('/',async(req,res)=>{
    const {name,startDate,members,projectLead}=req.body;
    
    const dup= await Project.findOne({name:req.body.name})
    try {
        if(dup.name) return res.status(400).send('Project already exists')
    } catch (error) {
    }

    const projects = new Project({
        name:name,
        projectLead:projectLead,
        startDate:startDate,
        members:members
    })
    // const emp = await Employee.findOne({_id:members[0].empId})
    projects.save().then(()=>{res.status(200).send(`${name} has been added with members of`)})
})

router.put('/:name/:empid',async(req,res)=>{

    const project=await Project.findOne({name:req.params.name})
    
    project.members.map(
        (item,index)=>{
            if(item.empId==req.params.empid){
                item.remark=req.body.remark;
                item.rating=req.body.rating;
            }
        }
    )

    project.save().then(()=>{res.status(200).send('Done')})
})

module.exports=router
