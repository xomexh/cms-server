const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

const {Attendance} = require('../models/models');

router.get('/:uname',async(req,res)=>{
    if(req.params.uname==='all'){
        var attendance = await Attendance.find()
        return res.status(200).send(attendance)
    }

    var attendance = await Attendance.find({uname:req.params.uname})
    res.status(200).send(attendance)
})

router.post('/',async(req,res)=>{
    
    try{
        var attendance = await Attendance.findOne({uname:req.body.uname,date:req.body.date})
        attendance.punchOut=req.body.punchOut
        attendance.save().then((response)=>{
            res.status(200).send(response)
            console.log('saved in try block')
        })
    }
    catch{
        const attendance = new Attendance({
            uname:req.body.uname,
            date:req.body.date,
            punchIn:req.body.punchIn
        })
        attendance.save().then((response)=>{
            res.status(200).send(response)
            console.log('saved in catch block')
        })
    }
    
})

module.exports=router;