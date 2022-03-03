const express = require('express');
const router = express.Router();

const {Message} = require('../models/models')

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

})

module.exports= router;