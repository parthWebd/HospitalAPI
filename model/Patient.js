const mongoose = require('mongoose');
const patientSchema =new mongoose.Schema ({
    phone:{
        type:String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required: true,
    },
    reports:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'report'
        }
    ]
       
},{timestamps:true});
const Patient = mongoose.model('Patient',patientSchema);
module.exports=Patient;