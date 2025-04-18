const express = require('express')
const ejs = require('ejs')
const path = require('path')
const dbConnection=require('./app/config/dbConnection')
const dotenv=require('dotenv').config()


const app = express()
//database connection
dbConnection()

app.use(express.json())
//view engine set
app.set('view engine', 'ejs')
app.set('views', 'views')

//app.use(express.static(__dirname + '/public'));

app.use(express.static(path.join(__dirname, 'public')));
const homeRouter = require('./app/router/HomeRouter')
app.use(homeRouter)

const StudentRoute = require('./app/router/StudentApiRoute')
app.use('/api',StudentRoute)
const port = 3007

app.listen(port, () => {
    console.log(`server running port http://localhost:${port}`);
    
})