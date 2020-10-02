const express=require('express')
const router=express.Router();
const passport=require('passport');

const patientController=require('../controllers/patientsController');

router.post('/register',patientController.createPatient);
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}),patientController.createReport);
router.post('/:id/all_reports',patientController.allReport)
module.exports=router;