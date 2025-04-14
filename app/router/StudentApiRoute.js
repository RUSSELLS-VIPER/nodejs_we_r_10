
const express = require('express')
const StudentApiController = require('../controller/StudentApiController')
const router = express.Router()



router.post('/create/student',StudentApiController.craeteStudent)
router.get('/student',StudentApiController.getStudent)



module.exports=router