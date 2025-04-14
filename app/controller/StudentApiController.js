const Student=require('../model/student')

class StudentApiController{


    async craeteStudent(req, res) {
        try {
            const { name, email, phone } = req.body
            
            const studentdata=new Student({
               name,email,phone

            })

            const data = await studentdata.save()
            res.status(200).json({
                message: "data added successfully",
                data:data
            })
            
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }
    }


    async getStudent(req, res) {
        try {
            
            const data=await Student.find()
            res.status(200).json({
                message: "data fetch successfully",
                total:data.length,
                data:data
            })
            
        } catch (error) {
            res.status(500).json({
                message:error.message
            })
        }
    }


}

module.exports= new StudentApiController()
