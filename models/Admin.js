const mongoose = require('mongoose');

//define schema
const AdminSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        }
    },{timestams:true}
);

//create collection

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel

