const express = require('express')
const EjsAuthController = require('../controller/EjsAuthController')
const authEjs = require('../middleware/authEjs')
const router = express.Router()




router.get('/signup', EjsAuthController.signup)
router.post('/signup/create', EjsAuthController.createsignup)
router.get('/login', EjsAuthController.login)
router.post('/login/craete', EjsAuthController.logincreate)
router.get('/dashboard', authEjs, EjsAuthController.CheckAuth,EjsAuthController.dashboard)
router.get('/logout',EjsAuthController.logout)



module.exports=router