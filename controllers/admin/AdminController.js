const AdminModel = require("../../models/Admin")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class AdminController {
  static dashboard = (req, res) => {
    try {
      const { name, email } = req.admin
      res.render('../view/admin/dashboard.ejs', { n: name, e: email })
    } catch (error) {
      console.log(error)
    }
  };

  static changepassword = async (req, res) => {

    res.render('../view/admin/changepassword.ejs',{message1: req.flash("error")})
  }

  static forgetpassword = async (req,res) =>{
    res.render('../view/forgetpassword.ejs')
  }




  static admininsert = async (req, res) => {
    try {
      //console.log(req.body)
      const { name, email, password, cpassword } = req.body
      const admin = await AdminModel.findOne({ email: email })
      //console.log(admin)
      if (admin) {
        req.flash('error', 'email already exist')
        res.redirect('/resister')
      }
      else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            try {
              const hashpassword = await bcrypt.hash(password, 10)
              const result = new AdminModel({
                name: name,
                email: email,
                password: hashpassword
              });
              await result.save();
              req.flash('success', 'resistration successfully please login!')
              res.redirect('/login')

            } catch (error) {
              console.log(error)
            }

          } else {
            req.flash('error', 'password and confirm password does not match')
            res.redirect('/resister')
          }

        } else {
          req.flash('error', 'All field are required')
          res.redirect('/resister')
        }
      }


      // const result = await AdminModel.create(req.body)
      // res.redirect('/login')

    } catch (error) {
      console.log(error)
    }
  };

  static verifylogin = async (req, res) => {
    try {
      //console.log(req.body)
      const { email, password } = req.body
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email })
        if (admin != null) {
          const ismatched = await bcrypt.compare(password, admin.password)
          if ((admin.email == email) & ismatched) {
            //token generate
            const token = jwt.sign({ id: admin._id }, 'abhishekhdcbnsxhdb123');
            // console.log(token)
            res.cookie('token', token)
            res.redirect('/admin/dashboard')
          } else {
            req.flash('error', 'email or password not matched')
            res.redirect('/login')
          }
        } else {
          req.flash('error', 'you are not resistered user')
          res.redirect('/login')
        }

      } else {
        req.flash('error', 'All field are required')
        res.redirect('/login')
      }

    } catch (error) {
      console.log(error)
    }
  }

  static logout = async (req, res) => {
    try {
      res.clearCookie('token')
      console.log(req.cookies.token)
      res.redirect('/login')

    } catch (error) {
      console.log(error)
    }
  }

  static updatePassword = async (req, res) => {
    const { old_password, new_password, cpassword } = req.body;
    // console.log(req.admin)
    // const {_id }=req.admin
    // console.log(_id)

    if (old_password && new_password && cpassword) {
      const admin = await AdminModel.findById(req.admin._id);
      const ismatched = await bcrypt.compare(old_password, admin.password);
      //const isPasswordMatched = await userModel.comparePassword(req.body.old_password);
      if (!ismatched) {

        req.flash('error', 'Old password is incorrect')
        res.redirect('/changepassword')
      } else {
        if (new_password !== cpassword) {
          req.flash('error', 'Paswword not Match')
          res.redirect('/changepassword')

        } else {
          
          const newHashPassword = await bcrypt.hash(new_password,10);
          //console.log(req.user)
          await AdminModel.findByIdAndUpdate(req.admin._id, {
            $set: { password: newHashPassword },
          });
          
          req.flash('error', 'Password changed succesfully')
          res.redirect('/changepassword')
        }
      }
    }else{
      req.flash('error', 'All Fields are Required')
      res.redirect('/changepassword')
    }
  }

  
  }

module.exports = AdminController