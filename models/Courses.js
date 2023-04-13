const mongoose = require("mongoose");

//define schema
const CoursesSchema = new mongoose.Schema(
  {
    Course_Name: {
      type: String,
      required: true,
    },
    Fee: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Speed: {
      type: String,
      required: true,
    },
    Rating: {
      type: String,
      required: true,
    },
    Teacher_Name: {
        type: String,
        required: true,
      },
    Description: {
        type: String,
        required: true,
      },
      Instructor: {
        type: String,
        required: true,
      },
      Lectures: {
        type: String,
        required: true,
      },
      Duration: {
        type: String,
        required: true,
      },
      Enrolled: {
        type: String,
        required: true,
      },
      Language: {
        type: String,
        required: true,
      },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

//create collection
const CoursesModel = mongoose.model("Courses", CoursesSchema);

module.exports = CoursesModel;
