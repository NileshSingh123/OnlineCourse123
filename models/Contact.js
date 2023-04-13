const mongoose = require("mongoose");

//define schema
const ContactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true
        },
        mobile_number:{
            type:String,
            required:true
        },
        subject:{
            type:String,
            required:true,
        },
        message:{
            type:String,
            required:true
        },
    },{timestamps: true});

    //create collection
    const ContactModel = mongoose.model("contact",ContactSchema);
    module.exports = ContactModel