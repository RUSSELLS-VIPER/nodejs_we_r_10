const express = require('express')
const ejs=require('ejs')


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')


const homeRouter = require('./app/router/HomeRouter')
app.use(homeRouter)

const port = 3007

app.listen(port, () => {
    console.log('server running port 3007');
    
})