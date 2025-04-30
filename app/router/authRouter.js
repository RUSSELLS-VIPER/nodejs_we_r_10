const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthorController');
const { Auth } = require('../middleware/auth');


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)


router.use(Auth)
router.get('/profile', AuthController.userprofile)
router.post('/update/password', AuthController.updatePassword)


module.exports = router