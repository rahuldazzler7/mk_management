const express= require('express');

const router = express.Router();
const passport = require(`passport`);

const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

router.get('/', (req,res)=>res.render('welcome'));

var AssetModel =require(`../models/Assetdirect`);
var AssetMod =require(`../models/Assetdirect`);
var Employee = require('../models/Employeereg');

router.get('/employeedashboard',ensureAuthenticated, (req,res)=>{
  if(req.query.search){
    const regey = new RegExp(escapeRegex(req.query.search), 'gi') ;
    Employee.find({$or:[{name: regey},{emp_id: regey},{status: regey},{grade: regey},{tower: regey},
      {service_line: regey},{supervisor_name: regey},{gender: regey},
      {capgemini_email: regey},{email: regey},{contact: regey}]},(err,employees)=>{

      if(err){console.log(err);}
      else{
        res.render('employeedashboard', {aemployees :employees});
      }
    });
  }
  else{
  Employee.find({},(err,employees)=>{

    if(err){console.log(err);}
    else{
      res.render('employeedashboard', {aemployees :employees});
    }
  });
}
});

router.get(`/dashboard`, ensureAuthenticated, function(req,res) {

  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi') ;
    AssetModel.find({$or:[{owner: regex},{assettype: regex},{currentuser: regex},{serialnumber: regex},{hostname: regex}]},function(err, users){
      if(err) {console.log(err);}
      else 
      { 
        res.render(`dashboard`,{ rusers: users});
      } });

  }
  
        else{
  AssetModel.find({},function(err, users){
      
    if(err) {console.log(err);}
    else 
    { 
      res.render(`dashboard`,{ rusers: users,
      });
    } });
  }
    }

);
router.get('/edit/:id', ensureAuthenticated, (req,res)=>{

  AssetModel.findById(req.params.id, (err,users)=>{

    if(err){
      console.log(err);
    }
    else{

      res.render('editForm',{rusers: users});
    }
  });

});
router.get('/delete/:id', ensureAuthenticated, (req,res)=>{

  AssetModel.findOneAndDelete(req.params.id, (err,users)=>{

    if(err){
      res.redirect('../dashboard');
    }
    else{

      res.redirect('../dashboard');
    }
  });

});

router.get('/editemp/:id',ensureAuthenticated,(req,res)=>{

  Employee.findById(req.params.id,(err,employees)=>{
    if(err){console.log(err);}
    else{
      res.render('emp_regedit',{aemployees :employees});
    }
  })
});


function escapeRegex(text){
  return text.replace(/[-[\]{}()*+?., \\^$|#\s]/g,"//$&");
}

module.exports =router;