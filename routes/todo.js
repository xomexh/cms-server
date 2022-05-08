const express = require('express');
const router = express.Router();

const {Todo}=require('../models/models')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

router.post('/',async(req,res)=>{
    var {item,uname}=req.body;

    const todo= new Todo({
        uname:uname,
        item:item
    })

    todo.save().then(()=>{
        return res.status(200).send("Successfully Added")
    })
})

router.get('/:uname',async(req,res)=>{
    const items = await Todo.find({uname:req.params.uname})
    return res.status(200).send(items)
})

router.delete('/:id',async(req,res)=>{
    const message=await Todo.findByIdAndDelete(req.params.id)
    if(message){
        return res.status(200).send("Deleted succesfully")
    }
})
