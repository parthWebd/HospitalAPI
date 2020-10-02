const Patient=require('../model/Patient')
const Doctor=require('../model/doc')
const Report=require('../model/report')
// const { report } = require('../routes/patients')

module.exports.createPatient=async function(req,res){

        if(req.body.phone==undefined || req.body.name==undefined){
            return res.json(411,{message:"Incomplete Data"});
        }
        
        Patient.findOne({phone:req.body.phone},function(err,patient){
            if(patient==null){
                Patient.create({
                    phone:req.body.phone,
                    name:req.body.name
                },function(err,patient){
                    if(err){
                        console.log(req.body)
                        return res.json(411,{message:"Error creating patient"})
                    }
                    return res.json(200,{message:'pateint created succesfully'})
                })
            }
            else{
                return res.json(422,{
                    patient:patient.toJSON()
                })
            }
            
        })

}
module.exports.createReport= async function(req,res){
    let docId=req.body.doctor
    let patientId=req.params.id;
    let Status=["Negative","Home Quarantine","Positive", "Travelled Quarantine"]
    if(docId==undefined || patientId==undefined || req.body.status==undefined){
        return res.json(411,{message:"Incomplete Data"});
    }
    try{
        let doc=await Doctor.findById(docId)
        let patient=await Patient.findById(patientId)
        //console.log(docId,' ',req.dctor)
        let repo=await Report.create({
            patient:patient.name,
            doctor:doc.username,
            status:Status[req.body.status]
        })
        if(repo){
            //console.log(repo)
            patient.reports.push(repo)
            patient.save()                                                                            
            return res.json(200,{
                message:"Report successfully created"
            })
            
        }
        else{
            return res.status(500).json({
                message: 'Error in creating Report'
            });
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'Error'
        });
    }
}
module.exports.allReport=async function(req,res){
    let patientId=req.params.id;
    try{
        let patient=await Patient.findById(patientId);
        let repos=patient.reports;
        let allrepos=new Array();
        for(let i of repos){
            let rep=await Report.findById(i)
            allrepos.push(rep)
            // console.log(rep)
        }
        return res.json(200,{
            reports:allrepos
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'Error'
        });
    }
}