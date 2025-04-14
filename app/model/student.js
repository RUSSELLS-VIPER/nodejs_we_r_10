const mongoose = require('mongoose')

const Schema = mongoose.Schema


const StudentSchema=new Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    phone: {
        type: String,
        require:true
    },
})


const StudentModel = mongoose.model('student', StudentSchema)
module.exports=StudentModel