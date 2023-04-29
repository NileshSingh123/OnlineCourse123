const AboutModel = require('../models/About')
const BatchModel = require('../models/Batch')
const CoursesModel = require('../models/Courses')
const PlacementModel = require('../models/Placement')
const SliderModel = require('../models/Slider')
const AdminModel = require('../models/Admin')
const bcrypt = require('bcrypt');

class FrontController{

    static index = async(req,res)=>{
        const data = await SliderModel.find()
        const result = await CoursesModel.find()
        const upc = await BatchModel.find()
        // console.log(data)
        res.render('../view/home.ejs',{d:data,e:result,ba:upc,message: req.flash("error")})
    }

    static about = async(req,res)=>{
        const result = await AboutModel.find()
        res.render('../view/about.ejs',{r:result})
    }

    static courses = async(req,res)=>{
        const result = await CoursesModel.find()
        res.render('../view/courses.ejs',{e:result})
    }

    static blog = (req,res)=>{
        res.render('../view/blog.ejs')
    }

    static contact = async(req,res)=>{
        
        res.render('../view/contact.ejs',{message1: req.flash("success")})
        console.log(req.flash("error"))
    }

    static login = async(req,res)=>{
        
        res.render('../view/login.ejs',{message: req.flash("success"),message1:req.flash("error")});
    }

    static resister = async(req,res)=>{
        
        res.render('../view/resister.ejs',{message: req.flash('error')})
    }

    

    


    static visite = (req,res)=>{
        res.render('../view/visite.ejs')
    }

    static placement = async(req,res) =>{
        const result = await PlacementModel.find()
        res.render('../view/placement.ejs',{p:result})
    }

    static coursedetails = async(req,res)=>{
        try{
            const data = await CoursesModel.findById(req.params.id)
            const data1 = await CoursesModel.find().skip({_id:-1}).limit(3)
            // console.log(data1)
            res.render('../view/course-details.ejs',{d:data,d1:data1})
        }catch(err){
            console.log(err)
        }
        
    }

    static student = async (req,res)=>{
        try{
            res.render('../view/course-details',{message: req.flash('error')})
        }
        catch(error){
            console.log(error)
        }
    }

    static courselist = (req,res)=>{
        res.render('../view/course-list.ejs')
    }

    static eventdetails = async(req,res)=>{
        try{
            const upc = await BatchModel.findById(req.params.id)
            res.render('../view/event-details.ejs',{ba:upc})
        }
        catch(error){
            console.log(error)
        }
    }

    static instructor = (req,res)=>{
        res.render('../view/instructor.ejs')
    }

// static verify = async(req,res)=>{
//     try{
//         //  console.log(req.body)
//         const{email,password} = req.body
//         if(email && password){
//             const admin = await AdminModel.findOne({email:email})
//             if(admin != null){
//                 const ismatched = await bcrypt.compare(password,admin.password)
//                 if((admin.email==email) && ismatched){
//                     res.redirect('/admin/dashboard')

//                 }else{
//                     req.flash("error","email or password is not match");
//                 res.redirect("/login")
//                 }

//             }else{
//                 req.flash("error","You are not register user");
//                 res.redirect("/login")
//             }

//         }else{
//             req.flash("error","All field are required");
//             res.redirect("/login")
//         }
//     }catch(error){
//         console.log(error)
//     }
// }


    
}


module.exports=FrontController