const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const {Employee} = require('../models/models')

router.put('/',async(req,res)=>{
    var {name,age,uname,project,doj,exp}=req.body;
    const result = await Employee.updateOne({uname:uname},{
        $set:{
            name:name,
            age:age,
            project:project,
            doj:doj,
            exp:exp
        }
    })
    res.status(200).send(result)
    console.log(result)
})

router.get('/:uname',async(req,res)=>{

    if(req.params.uname==='all'){
        const emp = await Employee.find()
        return res.status(200).send(emp)
    }

    const emp = await Employee.findOne({uname:req.params.uname})
    return res.status(200).send(emp)

    
})

module.exports=router