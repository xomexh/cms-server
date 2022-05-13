const express = require('express');
const router = express.Router();

const {Salary} = require('../models/models')

router.get('/:name',async (req,res)=>{
    if(req.params.name==='all'){
        var salary = await Salary.find()
        return res.status(200).send(salary);
    }

    var salary = await Salary.find({uname:req.params.name})
    res.status(200).send(salary);

})

router.post('/',async (req,res)=>{
    var {uname,package,monthly,last}=req.body;

    var salary = new Salary({
        uname:uname,
        package:package,
        monthlyInhand:monthly,
        last: last
    })

    salary.save().then(()=>{
        res.status(200).send(`${uname} has salary of ${package} with monthly of:${monthly} recieved last on ${last}`)
    })
})

module.exports=router;