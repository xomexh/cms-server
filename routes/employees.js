const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const sharp = require('sharp')

const {Employee} = require('../models/models')

router.put('/',async(req,res)=>{
    var {firstname,
        lastname,
        age,
        uname,
        mobilenumber,
        address,
        city,
        state,
        pincode,
        educationBachelors,
        currentProject,
        profilePhoto,
        emailid}=req.body;    

    const result = await Employee.updateOne({uname:uname},{
        $set:{
            profilePhoto:profilePhoto,
            firstname:firstname,
            lastname:lastname,
            age:age,
            mobilenumber:mobilenumber,
            address:address,
            city:city,
            state:state,
            pincode:pincode,
            educationBachelors:educationBachelors,
            emailid:emailid,
            currentProject:currentProject
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