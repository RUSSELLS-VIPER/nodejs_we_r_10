const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthorController');
const { Auth } = require('../middleware/auth');


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/verify-otp', AuthController.verifyOtp)
router.post('/reset-password-link', AuthController.resetPasswordLink);
router.post('/reset-password/:id/:token', AuthController.confirmPasswor);


router.use(Auth)
router.get('/profile', AuthController.userprofile)
router.post('/update/password', AuthController.updatePassword)


module.exports = router