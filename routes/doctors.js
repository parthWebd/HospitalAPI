const express = require ('express');
const router  = express.Router();

const doctor = require('../controllers/doctorController')
// router.get('/register',doctor.register);
router.post('/register',doctor.createDoc);
router.post('/login',doctor.docLogin);
module.exports=router;