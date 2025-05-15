const { hsahePassword, comparePassword } = require('../middleware/auth');
const UserModel = require('../model/user')
const statsucode = require('../helper/httpStatusCode')
const jwt=require('jsonwebtoken');
const { Error } = require('mongoose');
const sendEmailVerificationOTP = require('../helper/emailVerification');
const EmailVerifyModel=require('../model/otpModel')

class AuthController{

    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(statsucode.internalServerError).json({
                    message: 'All fields are required'
                });
            }
            const existUser = await UserModel.findOne({ email });
            if (existUser) {
                return res.status(400).json({
                    message: 'User already exist'
                });
            }

            const hashedPassword = await hsahePassword(password);
            const user = await new UserModel({
                name,
                email,
                password: hashedPassword
            }).save();
            console.log('uu',user);
            
            sendEmailVerificationOTP(req,user)

            res.status(201).json({
                message: 'User created successfully and otp send to your email',
                user: user
            });
        } catch (err) {
            console.log(err);

        }

    }


    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await UserModel.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.is_verified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await EmailVerifyModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEmailVerificationOTP(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await EmailVerifyModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            UserModel.validate(email, password)
            if (!email || !password) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }
            const user = await UserModel.findOne({ email });
            //console.log('user',user);   

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            // Check if user verified
            if (!user.is_verified) {
                return res.status(401).json({ status: false, message: "Your account is not verified" });
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email
            }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: "2h" })

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (err) {
            log(err);
        }

    }


   

    async userprofile(req, res) {
        return res.status(200).json({
            message: 'welcome to user profile page',
            data:req.user
           
        });

    }

    async updatePassword(req, res) {
        return res.status(200).json({
            message: 'welcome to user update page',
           
           
        });

    }



    

}





module.exports=new AuthController()