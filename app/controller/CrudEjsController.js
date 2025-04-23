const Student=require('../model/student')

class CrudEjsController{

    async studentlist(req, res) {
        try {
            const data = await Student.find()
            //console.log('ddddd',data);
            
            res.render('student/list', {
                title: "student list",
                data:data
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    async studentadd(req, res) {
        try {
            res.render('student/add', {
                title:"student add"
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    async studentCreate(req, res) {
        try {
            const { name, email, phone } = req.body

            const studentdata = new Student({
                name, email, phone

            })
            if (req.file) {
                studentdata.image = req.file.path
            }

            const data = await studentdata.save()
            res.redirect('/student')
           
        } catch (error) {
            console.log(error);
            
        }
    }
}


module.exports=new CrudEjsController()


