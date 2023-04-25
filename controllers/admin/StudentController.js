const StudentModel = require("../../models/Student");
const config = require('../../config/config')
const nodemailer = require('nodemailer');

class StudentController{


    static studentdisplay = async (req, res) => {
        const result = await StudentModel.find();
        const data = await StudentModel.findById(req.params.id);
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


      
      
      
      // static submitForm = async (req, res) => {
      //   const { name, email, course } = req.body;
      
      //   // Validate the input data
      //   if (!name || !email || !course) {
      //     return res.status(400).send('All fields are required');
      //   }
      
      //   try {
      //     // Save the user's registration data in the database
      //     await Registration.create({ name, email, course });
      
      //     // Send an email to the user to confirm their registration
      //     const subject = 'Registration Confirmation';
      //     const html = `Dear ${name},<br/><br/>Thank you for registering for the ${course} course.<br/><br/>We look forward to seeing you at the first class.<br/><br/>Sincerely,<br/>Your Course Team`;
      //     await emailService.sendEmail(email, subject, html);
      
      //     res.send('Registration successful');
      //   } catch (err) {
      //     console.error(err);
      //     res.status(500).send('Internal server error');
      //   }
      // };




}
module.exports = StudentController