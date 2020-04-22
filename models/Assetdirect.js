const mongoose= require('mongoose');

const HardwareSchema = new mongoose.Schema({

    hostname : {
        type : String,
        required : true
    },
    ipaddress : {
        type : String
    },
    owner : {
        type : String,
        required : true
    },
    
    serialnumber : {
        type : String,
        required : true
    },
    currentuser : {
        type : String,
        required : true
    },

    assettype :{
        type: [String],
        required: true
        },

    registrationdate :{
            type: String,
            required: true
            },
    cubicalno : {
        type: String
    }       
});

const Assetdirect = mongoose.model('Assetdirect',HardwareSchema );
module.exports = Assetdirect;