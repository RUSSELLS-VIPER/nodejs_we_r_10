const express = require('express')
const ejs = require('ejs')
const path=require('path')


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
const homeRouter = require('./app/router/HomeRouter')
app.use(homeRouter)

const port = 3007

app.listen(port, () => {
    console.log('server running port 3007');
    
})