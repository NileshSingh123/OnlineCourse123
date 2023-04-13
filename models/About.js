const mongoose = require("mongoose");

//define schema
const AboutSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        post:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        image:{
            public_id:{
                type:String
            },
            url:{
                type:String
            }
        }
    },{timestamps:true}
);

//create collection
const AboutModel = mongoose.model("About", AboutSchema)

module.exports = AboutModel