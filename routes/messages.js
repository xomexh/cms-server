const express = require('express');
const router = express.Router();

const {Message} = require('../models/models')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

router.get('/:id',async(req,res)=>{
    if(req.params.id==='all'){
        var messages = await Message.find()
        // var count= await Message.find().count()
        // var counter = 0;
        // // console.log(messages[0].id)
        // while(true){
        //     messages[counter].id=counter++;
            
        //     if (counter==count)
        //     break
        // }

        return res.status(200).send(messages);
    }

    var messages = await Message.findOne({id:req.params.id})
    res.status(200).send(messages);
})


router.post('/',async(req,res)=>{
    var {from,to,message}=req.body;

    try{
        const msg = await Message.findOne({_id:req.body.id})
        msg.message = message
        msg.save().then(()=>{
            res.status(200).send(`MSG NO:${count} ${from} has sent: ${message} to ${to} `)
        })
    }
    catch{
        var count= await Message.find().count()
        const messages = new Message({
            id: ++count,
            from:from,
            to:to,
            message:message
        })
    
        messages.save().then(()=>{
            res.status(200).send(`MSG NO:${count} ${from} has sent: ${message} to ${to} `)
        })
    }
    

})

router.delete('/:id',async(req,res)=>{
    const message=await Message.findByIdAndDelete(req.params.id)
    console.log(message)
    res.send(message);
})

module.exports= router;