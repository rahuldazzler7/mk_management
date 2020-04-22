const mongoose = require(`mongoose`);

const UserSchema = new mongoose.Schema({

    name:{

        type:String,
        required:true
    },
    email:{

        type:String,
        required:true
    },
    password:{

        type:String,
        required:true
    },
    isadmin:{
        type: Boolean,
        default: false
    }

});

const adminUser = mongoose.model(`adminUser`,UserSchema);
module.exports=adminUser;