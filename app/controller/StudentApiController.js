const { StudentModel, StudentSchemaValidate } = require("../model/student");
const fs = require("fs");

class StudentApiController {
  async craeteStudent(req, res) {
    //console.log(req.file);

    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      };
      //validating the request
      const { error, value } = StudentSchemaValidate.validate(data);
      if (error) {
        return res.status(401).json({
          message: error.details[0].message,
        });
      } else {
        const stu = new StudentModel(value)
        const dd=await stu.save()
        return res.status(201).json({
          message: "student created successfully",
          data: dd,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getStudent(req, res) {
    try {
      const data = await StudentModel.find();
      res.status(200).json({
        message: "data fetch successfully",
        total: data.length,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async editStudent(req, res) {
    try {
      const id = req.params.id;
      const editdata = await StudentModel.findById(id);
      if (editdata) {
        res.status(200).json({
          message: "get single data",
          data: editdata,
        });
      } else {
        res.status(404).json({
          message: "id not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;
      const { name, email, phone } = req.body;
      const updatedata = await StudentModel.findByIdAndUpdate(id, {
        name,
        email,
        phone,
      });

      res.status(200).json({
        message: "data update successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;

      const updatedata = await StudentModel.findByIdAndDelete(id);

      res.status(200).json({
        message: "data delete successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new StudentApiController();
