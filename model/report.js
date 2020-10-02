const mongoose = require('mongoose');
const reportSchema =new mongoose.Schema ({
    patient:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        required:true,
        default:Date.now()
    }
},{timestamps:true});
const Report = mongoose.model('Report',reportSchema);
module.exports=Report;

