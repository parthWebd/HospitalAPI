const doctor=require('../model/doc')
const jwt=require('jsonwebtoken')


module.exports.register=function(req,res){
    return res.render('register',{
        title:"register a doc"
    });
}

module.exports.docLogin=async function(req,res){
    if(req.body.username==undefined || req.body.password==undefined){
        return res.json(411,{message:"Incomplete Data"});
    }
    let doct=await doctor.findOne({username:req.body.username})
    if(!doct || doct.password!=req.body.password){
        return res.json(422,{message:'Invalid Username/Password'})
    }
    return res.json(200,{
        message:'Sign in successful , here is the token keep it safe',
        data:{
            token:jwt.sign(doct.toJSON(),'Codeal',{expiresIn:'1000000'})}
    })
}

module.exports.createDoc=function(req,res){
    console.log("hee",req.body);
    if(req.body.username==undefined || req.body.password==undefined || req.body.cnfpassword==undefined){
        return res.json(411,{message:"Incomplete Data"});
    }
    if(req.body.password!=req.body.cnfpassword){
        console.log("I m in crete if" , req.body.password, req.body.cnfpassword);
        req.flash('error',"Password does not match");
        return res.json(411,{message:"password don't match"});
    }
    else{
        doctor.findOne({username: req.body.username},function(err,user){
            console.log("I m in crete else",user);
            if(user==null){
                doctor.create({
                    username:req.body.username,
                    password:req.body.password,
                },function(err,user){
                    if(err){
                        // req.flash('error',err);
                        return res.json(411,{message:"error in creting the doctor"});
                    }
                    // req.flash('success','Doctor created successfully')

                    return res.json(200,user.toJSON());
                })
            }
            else{ 
                return res.json(411,{message:"Doctor already exists"})
             }
        })
        // return res.json(200,{});
    }
}