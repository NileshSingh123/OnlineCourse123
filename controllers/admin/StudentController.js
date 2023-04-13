const StudentModel = require("../../models/Student");

class StudentController{


    static studentdisplay = async (req, res) => {
        const result = await StudentModel.find();
        // console.log(data)
        res.render("../view/admin/student/studentdisplay", { s: result });
      };
      


    static student_insert = async(req,res)=>{
        
        try{
            // console.log(req.body)

            const result = new StudentModel({
                name: req.body.name,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                college_name: req.body.college_name,
                qualification: req.body.qualification,
                branch: req.body.branch
            });
            await result.save()
            res.redirect('/')

        }catch(error){
            console.log(error)
        }
    }


    static view = async (req, res) => {
        try {
          // console.log(req.params.id)
          // res.render('/admin/student/studentview')
          const result = await StudentModel.findById(req.params.id);
          // console.log(result)
          res.render("../view/admin/student/studentview", { view: result });
        } catch (error) {
          console.log(error);
        }
      };




      static studentdelete = async (req, res) => {
        try {
          // console.log(req.params.id)
          const data = await StudentModel.findById(req.params.id);
          await StudentModel.findByIdAndDelete(req.params.id);
          res.redirect("/admin/student/studentdisplay");
        } catch (error) {
          console.log(error);
        }
      };




}
module.exports = StudentController