const mongoose = require('mongoose')

//schema define
const PlacementSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        company_name:{
            type: String,
            required:true
        },
        designation:{
            type:String,
            required: true
        },
        image:{
            public_id:{
                type:String,
            },
            url:{
                type:String
            }
        }
    },{timestamps: true});

    //create collection
    const PlacementModel = mongoose.model("placement", PlacementSchema);
    module.exports = PlacementModel