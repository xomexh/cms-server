const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    uname: String,
    password: String,
    isAdmin:{
        type:Boolean,
        default:false
      }
});

const messageSchema = new mongoose.Schema({
    id:Number,
    title:String,
    from: String,
    to: String,
    message:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const salarySchema = new mongoose.Schema({
    uname:String,
    package:Number,
    monthlyInhand:Number,
    last:Date
})

const employeeSchema = new mongoose.Schema({
    profilePhoto:String,
    firstname:String,
    lastname:String,
    age:Number,
    mobilenumber:String,
    uname:String,
    project:String,
    doj:Date,
    address:String,
    city:String,
    state:String,
    pincode:String,
    emailid:String,
    education10th:String,
    education12th:String,
    educationBachelors:String,
    educationMasters:String,
    currentProject:String
})

const attendanceSchema = new mongoose.Schema({
    uname:String,
    date:Date,
    punchIn:{
        type:Date
    },
    punchOut:Date
})

const projectSchema = new mongoose.Schema({
    name:String,
    startDate:Date,
    endDate:Date,
    projectLead:String,
    members:[{
        empId:{type: mongoose.Schema.Types.ObjectId},
        remark:String,
        rating:Number
    }]

})

const leaveSchema = new mongoose.Schema({
    uname:String,
    typeOfLeave:String,
    request:String,
    status:String,
    reason:String,
    approvedBy:{
        type:mongoose.Schema.Types.ObjectId
    }
})

const todoSchema = new mongoose.Schema({
    uname:String,
    item:String
})

const Login = mongoose.model('Login',loginSchema);
const Message = mongoose.model('Messages',messageSchema);
const Salary = mongoose.model('Salary',salarySchema);
const Employee = mongoose.model('Employee',employeeSchema);
const Attendance = mongoose.model('Attendance',attendanceSchema)
const Project = mongoose.model('Projects',projectSchema)
const Leave = mongoose.model('Leaves',leaveSchema)
const Todo = mongoose.model('Todo',todoSchema)

exports.Login = Login;
exports.Message = Message;
exports.Salary = Salary;
exports.Employee = Employee;
exports.Attendance = Attendance;
exports.Project = Project;
exports.Leave = Leave;
exports.Todo = Todo;