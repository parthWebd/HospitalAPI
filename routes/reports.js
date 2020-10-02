const express=require('express')
const router=express.Router()

const repController=require('../controllers/reportsController')

router.post('/:status',repController.getAllReports)

module.exports=router