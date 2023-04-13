const cloudinary = require('cloudinary').v2;
const SliderModel = require("../../../models/Slider");

cloudinary.config({ 
  cloud_name: 'dbrnbg1n1', 
  api_key: '954334871439665', 
  api_secret: 'vuJky_zyIzrY9kY94cuL7nrR8x4',
  secure: true
});

class SliderController {
  static sliderdisplay = async (req, res) => {
    const result = await SliderModel.find();
    res.render("../view/admin/home/slider/sliderdisplay", { b: result });
  };



  static sliderinsert = async (req, res) => {
    //  console.log('hello')
    // console.log(req.body) 
   
    // console.log(req.files)
    // const imagefile = req.files.S_image
    // console.log(imagefile)

    try {
      const file = req.files.S_slider
      const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'slider_image'
      })



      // const{S_title,S_discription} = req.body;
      const result = new SliderModel({
        S_title:req.body.S_title,
        S_discription:req.body.S_discription,
        S_slider:{
          public_id: imagefile.public_id,
          url: imagefile.secure_url,
        },
        
      })
      await result.save()
      res.redirect('/admin/home/slider/sliderdisplay')
    } catch (error) {
      console.log(error);
    }
  };
  static view = async(req,res)=>{
    try{
        // console.log(req.params.id)
        // res.render('/admin/slider/sliderdview')
        const result = await SliderModel.findById(req.params.id)
        // console.log(result)
        res.render("../view/admin/home/slider/sliderview",{view:result})
    }
    catch(error){
        console.log(error)
    }

}


static edit = async(req,res)=>{
  // console.log(req.params.id)
  try{
    const data = await SliderModel.findById(req.params.id)
    res.render("../view/admin/home/slider/slideredit",{edit: data})

  }catch(error){
    console.log(error)
  }
}


static sliderupdate = async(req,res)=>{
  try{

    // image id deletion
    const data = await SliderModel.findById(req.params.id)
    const imageid = data.S_slider.public_id
    console.log(imageid)
    await cloudinary.uploader.destroy(imageid)

    // image update
    const file = req.files.S_slider
      const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'slider_image'
      })
    const result = await SliderModel.findByIdAndUpdate(req.params.id,{
      S_title: req.body.S_title,
        S_discription: req.body.S_discription,
        S_slider:{
          public_id: imagefile.public_id,
          url: imagefile.secure_url,
        },
    });
    await result.save();
    res.redirect("/admin/home/slider/sliderdisplay")
  }catch(error){
    console.log(error)
  }
}


static sliderdelete = async(req,res)=>{
  try{
    // console.log(req.params.id)
    const data = await SliderModel.findById(req.params.id)
    const imageid = data.S_slider.public_id
    await cloudinary.uploader.destroy(imageid)
    await SliderModel.findByIdAndDelete(req.params.id)
    res.redirect('/admin/home/slider/sliderdisplay')
    

  
  }catch(error){
    console.log(error)
  }
}

}
module.exports = SliderController;
