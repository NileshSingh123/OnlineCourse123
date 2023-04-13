const cloudinary = require('cloudinary').v2;
const PlacementModel = require("../../models/Placement")

cloudinary.config({ 
    cloud_name: 'dbrnbg1n1', 
    api_key: '954334871439665', 
    api_secret: 'vuJky_zyIzrY9kY94cuL7nrR8x4',
    secure: true
  });

class PlacementController{
  static placementdisplay = async (req, res) =>{
    const result = await PlacementModel.find();
    res.render("../view/admin/placement/placementdisplay", {p:result});
  }


  static placement_insert = async (req,res) =>{
    try{
      // console.log("hello")
      // console.log(req.body)

      const file = req.files.image
      const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'placed_student'
      })


      const result = new PlacementModel({
        name:req.body.name,
        company_name:req.body.company_name,
        designation:req.body.designation,
        image:{
          public_id: imagefile.public_id,
          url:imagefile.secure_url,
        },
      })
      await result.save()
      res.redirect('/admin/placement/placementdisplay')
    }catch(error){
      console.log(error)
    }
  };

  static view = async(req,res)=>{
    try{
      // console.log(req.params.id)
      const result = await PlacementModel.findById(req.params.id)
      res.render("../view/admin/placement/placementview",{view:result})
    }catch(error){
      console.log(error)
    }
  };

  static edit = async(req,res)=>{
    try{
      const data = await PlacementModel.findById(req.params.id)
      res.render("../view/admin/placement/placementedit",{edit:data})
    }catch(error){
      console.log(error)
    }
  };
  static placementupdate = async(req,res) =>{
    try{
      const data = await PlacementModel.findById(req.params.id)
      const imageid = data.image.public_id
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid)

      const file = req.files.image
      const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'placed_student'
      })
      const result =await PlacementModel.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        company_name:req.body.company_name,
        designation:req.body.designation,
        image:{
          public_id:imagefile.public_id,
          url:imagefile.secure_url
        }
      });
      await result.save();
      res.redirect("/admin/placement/placementdisplay")
    }catch(error){
      console.log(error)
    }
  };

  static placementdelete = async(req,res) =>{
    try{
      const data = await PlacementModel.findById(req.params.id)
      const imageid = data.image.public_id
      await cloudinary.uploader.destroy(imageid)
      await PlacementModel.findByIdAndDelete(req.params.id)
      res.redirect('/admin/placement/placementdisplay')
    }catch(error){
      console.log(error)
    }
  }

}
module.exports = PlacementController