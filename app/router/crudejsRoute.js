const express = require('express')
const CrudEjsController = require('../controller/CrudEjsController')
const router = express.Router()
const studentimage = require("../helper/studentImage")


router.get('/student', CrudEjsController.studentlist)
router.get('/student/add', CrudEjsController.studentadd)
router.post('/student/create', studentimage.single("image"),CrudEjsController.studentCreate)

module.exports=router