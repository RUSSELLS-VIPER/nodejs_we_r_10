const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

//validation schema
const StudentSchemaValidate = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in"] } }),

  phone:
    Joi.string()
    .regex(/^[0-9]{10}$/),
  // .custom((value, helper) => {
  //     // you can use any libs for check phone
  //     if (!checkPhone(value)) {
  //         return helper.message("phone is incorrect")

  //     return value
  //     }
  // })
});

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      default: "image",
    },
  },
  {
    timestamps: true,
  }
);

const StudentModel = mongoose.model("student", StudentSchema);
module.exports = { StudentSchemaValidate, StudentModel };
