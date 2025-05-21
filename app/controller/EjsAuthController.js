const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


class EjsAuthController{


    async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                return res.redirect('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }

    async signup(req, res) {
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
            
        }
    }


    async createsignup(req, res) {
        try {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            })
            const result = await user.save()
            console.log('data', result);

            if (result) {

              req.flash('message',"user register successfully")

               return res.redirect('/login')
            } else {
                console.log('register failed');

                return  res.redirect('/signup')
            }


        } catch (err) {
            console.log(err)
        }

    }

    async login(req, res) {
        try {
            const message=req.flash('message')
            res.render('login', {
                message
            })
        } catch (error) {
            console.log(error);

        }
    }




    async logincreate(req, res) {
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                console.log('All input is required');
                return res.redirect('/login');
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const tokendata = jwt.sign(
                    {
                        id: user._id,
                        name: user?.name,
                        email: user?.email,
                    },"lhefgadgajgjgfahgfhghjasgasj",{expiresIn:'1h'}
                )
                if (tokendata) {
                    res.cookie('userToken', tokendata)
                    return res.redirect('/dashboard');
                } else {
                    console.log('login failed');
                }
            }
            console.log('login failed');
           return res.redirect('/login');
        } catch (err) {
            console.log(err)
        }
    }


    async dashboard(req, res) {
        try {
             res.render('dashboard', {
                data:req.user
            })
            
        } catch (error) {
            console.log(error);
            
        }
    }


    async logout(req, res) {
        try {
            res.clearCookie('userToken')
            return res.redirect('/login');

            
        } catch (error) {
            console.log(error);
            
        }
    }

}


module.exports=new EjsAuthController()