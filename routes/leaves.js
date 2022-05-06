const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

const {Leave} = require('../models/models')

router.get('/:uname',async(req,res)=>{
    if(req.params.uname==='all'){
        var leaves=await Leave.find()
        return res.status(200).send(leaves)
    }

    var leave = await Leave.find({uname:req.params.uname})
    res.status(200).send(leave)
})

router.post('/',async(req,res)=>{
    const{uname,typeOfLeave,request,status,reason,approvedBy}=req.body

    try {
        var leave = await Leave.findOne({uname:uname})
        leave.status=status
        leave.save().then((response)=>{
            res.status(200).send(response)
        })
        
    } catch{
        const leave = new Leave({
        uname:uname,
        typeOfLeave:typeOfLeave,
        request:request,
        status:status,
        reason:reason,
        approvedBy:approvedBy
        })

        leave.save().then((response)=>{
            res.status(200).send(response)
        })
    }
})

module.exports=router