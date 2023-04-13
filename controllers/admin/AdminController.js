const AdminModel = require("../../models/Admin")
const bcrypt = require('bcrypt');

class AdminController {
    static dashboard =(req,res)=>{
        res.render('../view/admin/dashboard.ejs')
    };

    static login = async (req, res) => {
        res.render("login", { message: req.flash("success") });
      };
}

module.exports = AdminController