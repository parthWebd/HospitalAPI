const Report=require('../model/report');

module.exports.getAllReports=async function(req,res){
    try{
        let st=req.params.status
        console.log(st)
        let repos=await Report.find({})
        let repoStatus=new Array()
        for(let i of repos){
            if(i.status===st){
                repoStatus.push(i)
            }
        }
        return res.json(200,{
            reports:repoStatus
        })
    }catch(err){
        return res.status(500).json({
            message: 'Error'
        });
    }
}