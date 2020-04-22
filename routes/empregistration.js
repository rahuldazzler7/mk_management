const express = require('express');
let router = express.Router();
const passport = require('passport');
const empreg = require('../models/Employeereg');
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

router.get('/editemployeeregistration',ensureAuthenticated, (req,res)=>res.render('emp_regedit'));
router.get('/emp_registration', ensureAuthenticated, (req,res)=> res.render('emp_registration'));
router.post('/emp_registration',ensureAuthenticated,  (req,res)=>{

    const{emp_id,name,status,grade,tower,project_start, project_end,hire_date,service_line,supervisor_name,subbu_name,btStart_date,gender,capgemini_email,email,city, contact, remarks} = req.body;

        let errors = [];

     if(!emp_id || !name || !status || !grade || !tower || !project_start || !hire_date || !service_line || !supervisor_name ||!subbu_name ||!gender || !capgemini_email ||!email ||!city || !contact)  {
            errors.push({msg: 'Please fill all the required fields'});
        } 

     if(errors.length>0){
        res.render('emp_registration',{
            errors,
            emp_id,
            name,
            status,
            grade,
            tower,
            project_start, 
            project_end,
            hire_date,
            service_line,
            supervisor_name,
            subbu_name,
            btStart_date,
            gender,
            capgemini_email,
            email,
            city, 
            contact,
            remarks
        });
   
    }
    else{
        empreg.findOne({emp_id: emp_id})
        .then(employee=>{
            if(employee){
                errors.push({msg:'Employee already exists'})
                res.render('emp_registration',{
                    errors,emp_id,name,status,grade,tower,project_start, project_end,hire_date,service_line,
                supervisor_name,subbu_name,btStart_date,gender,capgemini_email,email,city, contact, remarks
                });
            }
            else{
                const newEmployee = new empreg({
                    emp_id,name,status,grade,tower,project_start, project_end,hire_date,service_line,
        supervisor_name,subbu_name,btStart_date,gender,capgemini_email,email,city, contact, remarks
                });

                newEmployee.save()
                .then(employee=>{res.redirect('/employeedashboard');
                    })
                .catch(err=>console.log(err));
            }
        });
    }

});

router.post('/editemp/:id',ensureAuthenticated, (req,res)=>{

    const mybody ={

        emp_id: req.body.emp_id,
        name: req.body.name,
        status: req.body.status,
        grade: req.body.grade,
        tower: req.body.tower,
        project_start: req.body.project_start,
        project_end: req.body.project_end,
        hire_date: req.body.hire_date,
        service_line: req.body.service_line,
        supervisor_name: req.body.supervisor_name,
        subbu_name: req.body.subbu_name,
        btStart_date: req.body.btStart_date,
        gender: req.body.gender,
        capgemini_email: req.body.capgemini_email,
        email: req.body.email,
        city: req.body.city,
        contact: req.body.contact,
        remarks: req.body.remarks    
    }
    empreg.findByIdAndUpdate(req.params.id,mybody,(err)=>{
        if(err){ res.redirect('editemp/'+req.params.id);}
        else{
            res.redirect('/employeedashboard');
        }
    });
});
module.exports = router;