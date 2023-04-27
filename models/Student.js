const mongoose = require("mongoose");

//define schema
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_number: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      course_name: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      college_name: {
        type: String,
        required: true,
      },
      qualification: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
    
  },{ timestamps: true });

//create collection
const StudentModel = mongoose.model("student", StudentSchema);

module.exports = StudentModel;
