const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    emp_id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status:{
        type:[String],
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    tower: {
        type: [String],
        required: true
    },
    project_start: {
        type: String,
        required: true
    },
    project_end: {
        type: String
    },
    hire_date: {
        type: String,
        required: true
    },
    service_line: {
        type: [String],
        required: true
    },
    supervisor_name: {
        type: String,
        required: true
    },
    subbu_name: {
        type: String,
        required: true
    },
    btStart_date: {
        type: String
        
    },
    gender: {
        type: [String],
        required: true
    },
    capgemini_email: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    city:{
        type: [String],
        required : true
    },
    contact:{
        type: String,
        required: true
    },
    remarks : {
        type:String
    }

});
const Employeereg = mongoose.model('Employeereg', EmployeeSchema);
module.exports = Employeereg;