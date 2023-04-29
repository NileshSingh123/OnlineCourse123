const ContactModel = require("../../models/Contact");

class ContactController{

    static contactdisplay = async (req,res) => {
        const data = await ContactModel.find();
        res.render("../view/admin/contact/contactdisplay",{c:data})

    };

    static contact_insert = async(req,res)=>{
        try{
            //console.log(req.body)
            const data = new ContactModel({
                name: req.body.name,
                email: req.body.email,
                mobile_number:req.body.mobile_number,
                subject:req.body.subject,
                message:req.body.message
            })
            await data.save()
            //console.log("save item")
            req.flash('success','message sent successfully')
            res.redirect('/contact')
        }
        catch(error){
            console.log(error)
        }
    }
    


    static view = async(req,res) =>{
        try{

            const result = await ContactModel.findById(req.params.id)

            res.render("../view/admin/contact/contactview",{view: result})
        }catch(error){
            console.log(error)
        }
    }




    static contactdelete = async (req, res) => {
        try {
          // console.log(req.params.id)
          await ContactModel.findByIdAndDelete(req.params.id);
          res.redirect("/admin/contact/contactdisplay");
        } catch (error) {
          console.log(error);
        }
      };
}



module.exports = ContactController