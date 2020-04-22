const express = require(`express`);
let router =express.Router();
const bcrypt = require(`bcryptjs`);
const passport2 = require(`passport`);
const User = require(`../models/User`);
const { ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

router.get(`/login`, (req, res) => res.render(`login`));
router.get(`/registerusers`, (req, res) => res.render(`registerusers`));

router.post(`/registerusers`,(req,res) => {

    const {name, email, password, password2} = req.body;

    let errors=[];
    if(!name || !email || !password || !password2){

        errors.push({msg:`Fill required fields`});
    }
    
    if(password!=password2){
        errors.push({msg:`Passwords do not match`});

    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
      }
    if(errors.length>0){
        res.render(`registerusers`,{
            errors,
            name,
            email,
            password,
            password2
        });

    }
    else{
        User.findOne({email: email}).then(user=>
            {
                if (user) {
                    errors.push({ msg: 'Email already exists' });
                    res.render('registerusers', {
                      errors,
                      name,
                      email,
                      password,
                      password2
                    });
                  }else{
                    const newUser = new User({
                        name,
                        email,
                        password,
    
                    });

                    if(req.body.isadmin === '1secretcodeforadmin51327'){
                        newUser.isadmin = true;
                    }

                    //Hashing
                    bcrypt.genSalt(10, (err,salt)=> bcrypt.hash(newUser.password,salt,(err,hash)=>{

                        if(err) throw err;
                        newUser.password=hash;

                        newUser.save()
                        .then(reguser =>{
                            req.flash(`success_msg`,`You are now registered and you're ready to login`);
                        res.redirect('/accounts/login');
                        })
                        .catch(err=>console.log(err));
                    } ))
    
                    
                  }

            }


        )


    }
});
module.exports =router;
router.post(`/login`,(req,res,next)=>{
    passport2.authenticate('admin', {
        successRedirect: '/dashboard',
        failureRedirect: '/accounts/login',
        failureFlash: true
      })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/accounts/login');
    
  });
module.exports =router;