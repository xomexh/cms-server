const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

const {Login, Employee} = require('../models/models')
const auth = require('../middleware/auth');

router.get('/login',async(req,res)=>{
    var login = await Login.find()
    // console.log(login.length)

    if(!login.length)
    return res.status(400).send("No users found") //returns bad request when no usernames exist
    
    res.status(200).send(login)
})

router.post('/login',auth,async(req,res)=>{

    var{uname,password}=req.body;

    if(await Login.findOne({uname:uname}))
    return res.status(400).send(`Username ${uname} exists`).end() //checks if same username exists

    const login = new Login({
        uname: uname,
        password: password
    })

    login.save().then(()=>{
        res.status(200).send(`User: ${uname} registered`) //registeres new user
    })

    const emp = new Employee({
        name:"",
        age:0,
        uname:uname,
        project:"",
        doj:Date.now(),
        exp:""
    })
    await emp.save()
})

router.post('/auth',async(req,res)=>{
    
    var {uname, password} = req.body;

    if(!await Login.findOne({uname:uname}))
    return res.status(400).send('Invalid Username')

    var user=await Login.findOne({uname:uname})

    if(user.password!=password)
    return res.status(400).send('Invalid Password')

    const token = jwt.sign({user},'jwtPrivateKey')

    //res.status(200).send(`${uname} is now logged in!`)
    res.status(200).send(token)
})

module.exports=router;