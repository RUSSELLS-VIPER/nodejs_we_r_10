const express = require('express')
const ejs = require('ejs')
const path = require('path')
const cors=require('cors')
const dbConnection=require('./app/config/dbConnection')
const cookieParser = require("cookie-parser")
const session = require('express-session');
const flash = require('connect-flash');

const dotenv = require('dotenv').config()
const app = express()
//database connection
dbConnection()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}))
app.use(cookieParser());
app.use(flash())
//view engine set
app.set('view engine', 'ejs')
app.set('views', 'views')

//app.use(express.static(__dirname + '/public'));




app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//app.use('/uploads', express.static('uploads'))
const homeRouter = require('./app/router/HomeRouter')
app.use(homeRouter)



const EjsRoute = require('./app/router/crudejsRoute')
app.use(EjsRoute)

const ejsAuthRouter=require('./app/router/ejsauthRoute')
app.use(ejsAuthRouter)

 const AuthRouter = require('./app/router/authRouter')
 app.use(AuthRouter)

const port = 3007

app.listen(port, () => {
    console.log(`server running port http://localhost:${port}`);
    
})