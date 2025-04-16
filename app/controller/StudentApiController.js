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


    async editStudent(req, res) {
        try {
            const id = req.params.id
            const editdata = await Student.findById(id)
            if (editdata) {
                res.status(200).json({
                    message:"get single data",
                    data: editdata
                })
                
            } else {
                res.status(404).json({
                    message: "id not found",
                  
                })
                
            }
           
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async updateStudent(req, res) {
        try {
            const id = req.params.id
            const {name,email,phone}=req.body
            const updatedata = await Student.findByIdAndUpdate(id, {
                name,email,phone
            })
          
                res.status(200).json({
                    message:"data update successfully",
                   
                })
           
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }


    async deleteStudent(req, res) {
        try {
            const id = req.params.id
           
            const updatedata = await Student.findByIdAndDelete(id)
          
                res.status(200).json({
                    message:"data delete successfully"
                   
                })
           
            
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }


}

module.exports= new StudentApiController()
