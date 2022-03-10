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
    name:String,
    age:Number,
    uname:String,
    project:String,
    doj:Date,
    exp:String
})

const attendanceSchema = new mongoose.Schema({
    uname:String,
    date:Date,
    punchIn:{
        type:Date,
        default:Date.now()
    },
    punchOut:Date
})

const projectSchema = new mongoose.Schema({
    name:String,
    startDate:Date,
    endDate:Date,
    members:[String]

})

const Login = mongoose.model('Login',loginSchema);
const Message = mongoose.model('Messages',messageSchema);
const Salary = mongoose.model('Salary',salarySchema);
const Employee = mongoose.model('Employee',employeeSchema);
const Attendance = mongoose.model('Attendance',attendanceSchema)
const Project = mongoose.model('Projects',projectSchema)

exports.Login = Login;
exports.Message = Message;
exports.Salary = Salary;
exports.Employee = Employee;
exports.Attendance = Attendance;
exports.Project = Project;