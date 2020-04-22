const express= require('express');
const mongoose = require('mongoose');
const flash = require(`connect-flash`);
const session = require(`express-session`);
const passport = require(`passport`);


const app = express();

require(`./config/passport`)(passport);

//Localhost connection

//mongoose.connect('mongodb://localhost:27017/assetmanagementcap')

const db = require('./config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true })
.then(()=> console.log(`MongoDB connected...`))
.catch(err => console.log(err));



app.use(express.urlencoded({ extended : false}));

//Express Session
app.use(
    session({
      secret: 'Rahulsecret',
      resave: true,
      saveUninitialized: true
    }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use(flash());

app.use(function(req, res, next) {
    res.locals.adusers = req.user;  
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


app.use('/loginstf', express.static('loginstf'));
app.use('/welcomestf', express.static('welcomestf'));
app.use('/assetregstf', express.static('assetregstf'));
app.use('/dashboardstf', express.static('dashboardstf'));
app.use('/empregstf', express.static('empregstf'));
app.use('/empdashboard', express.static('empdashboard'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/accounts', require('./routes/accounts'));
app.use('/empregistration', require('./routes/empregistration'));

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
