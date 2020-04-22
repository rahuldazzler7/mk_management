const express= require('express');
const router = express.Router();
const passport = require(`passport`);
const Assetdirect = require(`../models/Assetdirect`);
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/login', (req,res)=>res.render('login'));
router.get('/assetregistration',ensureAuthenticated, (req,res)=>res.render('assetregistration'));
router.get('/editForm',ensureAuthenticated, (req,res)=>res.render('editForm'));

router.post('/assetregistration',(req,res)=>{

    const {ipaddress, hostname, owner, assettype, serialnumber, registrationdate,currentuser,cubicalno} = req.body;

    let errors = [];

    if(!cubicalno ||!hostname || !owner|| !assettype || !serialnumber || !registrationdate || !currentuser ){
        errors.push({msg : `Please fill the required fields`});
    }
    
    if(errors.length>0){
        res.render(`assetregistration`,{
            errors,
            ipaddress,
            hostname,
            owner,
            assettype,
            serialnumber,
            registrationdate,
            currentuser,
            cubicalno

        }
        
        );
    }
    else{
        Assetdirect.findOne({$and:[{hostname: hostname},{serialnumber: serialnumber}]})
        .then(asset=>{

            if(asset){
                errors.push({msg: ` Please check with the hostname or serial number, might be already exists`})
                res.render(`assetregistration`,{
                    errors,
                    ipaddress,
                    hostname,
                    owner,
                    assettype,
                    serialnumber,
                    registrationdate,
                    currentuser,
                    cubicalno
        
                });
            }else{

                const newSystem = new Assetdirect({

                    ipaddress,
                    hostname,
                    owner,
                    assettype,
                    serialnumber,
                    registrationdate,
                    currentuser,
                    cubicalno


                });

                newSystem.save()
                .then(asset =>{
                    res.redirect('/dashboard');
                })
                .catch(err=>console.log(err));
            }
           

            
});
    }
});




router.post('/edit/:id', (req,res)=>{

    const mybodydata={

        hostname: req.body.hostname,
        ipaddress: req.body.ipaddress,
        owner: req.body.owner,
        serialnumber: req.body.serialnumber,
        currentuser: req.body.currentuser,
        assettype: req.body.assettype,
        registrationdate: req.body.registrationdate,
        cubicalno: req.body.cubicalno
    }
    Assetdirect.findByIdAndUpdate(req.params.id, mybodydata, (err)=>{
        if(err){
            res.redirect('edit/'+req.params.id);
        }
        else{
            res.redirect('/dashboard');
        }
    } );
    
  });


module.exports =router;
router.post(`/login`,(req,res,next)=>{
    passport.authenticate('user', {
        successRedirect: '/userdashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
});
module.exports =router;

