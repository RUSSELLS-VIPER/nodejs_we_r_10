const express = require('express')
const HomeController = require('../controller/HomeController')

const router = express.Router()

router.get('/', HomeController.homepage)
router.get('/about', HomeController.aboutPage)
router.get('/blog', HomeController.blogPage)


module.exports=router