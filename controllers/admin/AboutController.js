const cloudinary = require('cloudinary').v2;
const AboutModel = require("../../models/About")

cloudinary.config({ 
    cloud_name: 'dbrnbg1n1', 
    api_key: '954334871439665', 
    api_secret: 'vuJky_zyIzrY9kY94cuL7nrR8x4',
    secure: true
  });

class AboutController{
    static aboutdisplay=async(req,res)=>{
        const result = await AboutModel.find();
        res.render('../view/admin/about/aboutdisplay', {r:result})
    };
    static about_insert = async(req,res) => {

        try{
            const file = req.files.image
            const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
            folder: 'aboutImage'
        })

        const result = new AboutModel({
            name:req.body.name,
            post:req.body.post,
            description:req.body.description,
            image:{
                public_id:imagefile.public_id,
                url:imagefile.secure_url,
            },
        })
        await result.save()
        res.redirect('/admin/about/aboutdispay')
    }catch(error){
        console.log(error);
    }
    };
    static view = async (req,res)=>{
        try{
            const result = await AboutModel.findById(req.params.id)

            res.render("../view/admin/about/aboutview",{view:result})
        }
        catch(error){
            console.log(error)
        }
    };


    static edit = async (req,res)=>{
        try{
            const data = await AboutModel.findById(req.params.id)
            res.render("../view/admin/about/aboutedit",{edit: data})
        }catch(error){
            console.log(error)
        }
    };

    static about_update = async (req,res)=>{
        try{

            const data = await AboutModel.findById(req.params.id)
            const imageid = data.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            //image update
            const file = req.files.image
            const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
            folder: 'aboutImage'
        })
        const result = await AboutModel.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            post: req.body.post,
            description: req.body.description,
            image:{
                public_id: imagefile.public_id,
                url: imagefile.secure_url
            },
        });
        await result.save();
        res.redirect("/admin/about/aboutdispay")
        }catch(error){
            console.log(error)
        }
    }

    static aboutdelete = async(req,res)=>{
        try{

            const data = await AboutModel.findById(req.params.id)
            const imageid = data.image.public_id
            await cloudinary.uploader.destroy(imageid)
            await AboutModel.findByIdAndDelete(req.params.id)
        }catch(error){
            console.log(error)
        }
        }
    }

module.exports = AboutController