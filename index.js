const express = require('express');
const req = require('express/lib/request');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const bcrypt = require('bcrypt')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')

const auth = require('./middleware/auth');
const { response } = require('express');

const login = require('./routes/logins');
const messages = require('./routes/messages');
const employees = require('./routes/employees');

app.use(express.json())

app.use('/',login)
app.use('/messages',messages)
app.use('/employees',employees)


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Employee Management System API",
        description: "API information of my final year project",
        contact: {
          name: "Somesh Panda"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js",'./routes/logins.js']
  };
  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  

// app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); // this is to avoid CROS error which browsers throw.

mongoose.connect('mongodb://localhost/project')
  .then(()=> console.log('connected to MongoDB'))
  .catch(err=> console.error('Could not connect to MongoDB'));


app.get('/salary/:name',async (req,res)=>{
    if(req.params.name==='all'){
        var salary = await Salary.find()
        return res.status(200).send(salary);
    }

    var salary = await Salary.findOne({uname:req.params.name})
    res.status(200).send(salary);

})

app.post('/salary',async (req,res)=>{
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

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})