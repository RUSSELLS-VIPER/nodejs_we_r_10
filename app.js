const express = require('express')


const app = express()


const homeRouter = require('./app/router/HomeRouter')
app.use(homeRouter)

const port = 3007

app.listen(port, () => {
    console.log('server running port 3007');
    
})