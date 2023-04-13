const cloudinary = require("cloudinary").v2;
const CoursesModel = require("../../models/Courses");

cloudinary.config({
  cloud_name: "dbrnbg1n1",
  api_key: "954334871439665",
  api_secret: "vuJky_zyIzrY9kY94cuL7nrR8x4",
  secure: true,
});

class CourseController {
  static coursedisplay = async (req, res) => {
    const result = await CoursesModel.find();
    // console.log(data)
    res.render("../view/admin/course/coursedisplay", { e: result });
  };
  static insertcourses = async (req, res) => {
    //  console.log("hello")
    //  console.log(req.body)

    try {
      const file = req.files.image;
      const imagefile = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Course_image",
      });
      const data = new CoursesModel({
        Course_Name: req.body.Course_Name,
        Fee: req.body.Fee,
        Title: req.body.Title,
        Speed: req.body.Speed,
        Rating: req.body.Rating,
        Teacher_Name: req.body.Teacher_Name,
        Description: req.body.Description,
        Instructor: req.body.Instructor,
        Lectures: req.body.Lectures,
        Duration: req.body.Duration,
        Enrolled: req.body.Enrolled,
        Language: req.body.Language,
        image: {
          public_id: imagefile.public_id,
          url: imagefile.secure_url,
        },
      });
      await data.save();
      res.redirect("/admin/course/coursedisplay");
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  static view = async (req, res) => {
    try {
      // console.log(req.params.id)
      // res.render('/admin/slider/sliderdview')
      const result = await CoursesModel.findById(req.params.id);
      // console.log(result)
      res.render("../view/admin/course/courseview", { view: result });
    } catch (error) {
      console.log(error);
    }
  };
  static edit = async (req, res) => {
    // console.log(req.params.id)
    try {
      const data = await CoursesModel.findById(req.params.id);
      res.render("../view/admin/Course/courseedit", { edit: data });
    } catch (error) {
      console.log(error);
    }
  };

  static courseupdate = async (req, res) => {
    try {
      // image id deletion
      const data = await CoursesModel.findById(req.params.id);
      const imageid = data.image.public_id;
      //   console.log(imageid)
      await cloudinary.uploader.destroy(imageid);

      // image update
      const file = req.files.image;
      const imagefile = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Course_image",
      });
      const result = await CoursesModel.findByIdAndUpdate(req.params.id, {
        Course_Name: req.body.Course_Name,
        Fee: req.body.Fee,
        Title: req.body.Title,
        Speed: req.body.Speed,
        Rating: req.body.Rating,
        Teacher_Name: req.body.Teacher_Name,
        Description: req.body.Description,
        Instructor: req.body.Instructor,
        Lectures: req.body.Lectures,
        Duration: req.body.Duration,
        Enrolled: req.body.Enrolled,
        Language: req.body.Language,
        image: {
          public_id: imagefile.public_id,
          url: imagefile.secure_url,
        },
      });
      await data.save();
      res.redirect("/admin/course/coursedisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static coursedelete = async (req, res) => {
    try {
      // console.log(req.params.id)
      const data = await CoursesModel.findById(req.params.id);
      const imageid = data.image.public_id;
      await cloudinary.uploader.destroy(imageid);
      await CoursesModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/course/coursedisplay");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CourseController;
