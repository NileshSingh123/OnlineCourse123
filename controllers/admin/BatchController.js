const cloudinary = require("cloudinary").v2;
const BatchModel = require("../../models/Batch");


cloudinary.config({
    cloud_name: "dbrnbg1n1",
    api_key: "954334871439665",
    api_secret: "vuJky_zyIzrY9kY94cuL7nrR8x4",
    secure: true,
  });


class BatchController{

    static batchdisplay = async (req, res) =>{
        const upc = await BatchModel.find();
        //console.log(data)
        res.render("../view/admin/batch/batchdisplay",{ba: upc})
    }

    static batch_insert = async(req,res) => {
        const result = await BatchModel.find();
        // console.log(result)
        try{
            const file = req.files.image;
            const imagefile = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: "Batch_image",
            });
            const data = new BatchModel({
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                batch_name: req.body.batch_name,
                teacher_name: req.body.teacher_name,
                timing: req.body.timing,
                last_update: req.body.last_update,
                fee: req.body.fee,
                description: req.body.description,
                image: {
                    public_id: imagefile.public_id,
                    url: imagefile.secure_url,
                },
            });
            await data.save();
                res.redirect("/admin/batch/batchdisplay")
        }catch(error){
            console.log(error)
        }
    };

    static view = async (req, res) =>{

        try{
            const result = await BatchModel.findById(req.params.id);

            res.render("../view/admin/batch/batchview", {view: result});

        }catch(error){
            console.log(error);
        }
    };

    static edit = async (req, res) =>{

        try{
            const data = await BatchModel.findById(req.params.id)
            res.render("../view/admin/batch/batchedit", {edit: data})
        }catch(error){
            console.log(error);
        }
    };

    static batchupdate = async (req, res)=>{
        try{
        const data = await BatchModel.findById(req.params.id)
        const imageid = data.image.public_id;
        //console.log(imageid)
        await cloudinary.uploader.destroy(imageid)

        //image update
        const file = req.files.image;
        const imagefile = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Batch_image",
        });

        const result = new BatchModel({
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            batch_name: req.body.batch_name,
            teacher_name: req.body.teacher_name,
            timing: req.body.timing,
            last_update: req.body.last_update,
            fee: req.body.fee,
            description: req.body.description,
            image: {
                public_id: imagefile.public_id,
                url: imagefile.secure_url,
            },
        });
        await result.save();
        res.redirect("/admin/batch/batchdisplay");
        }catch (error){
            console.log(error);
        }
    };

    static batchdelete = async (req, res) =>{

        try{

            const data = await BatchModel.findById(req.params.id)
            const imageid = data.image.public_id;
            await cloudinary.uploader.destroy(imageid);
            await BatchModel.findByIdAndDelete(req.params.id);
            res.redirect("/admin/batch/batchdisplay");
        }catch(error){
            console.log(error);
        }
    }








}
module.exports = BatchController