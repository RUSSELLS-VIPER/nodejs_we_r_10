const mongoose = require('mongoose')



const DBcon =async () => {
    const con = await mongoose.connect(process.env.MONGO_URL)
    if (con) {
        console.log('db connected successfully');
        
    } else {
        console.log('db connection failed');
        
    }
    
}

module.exports=DBcon