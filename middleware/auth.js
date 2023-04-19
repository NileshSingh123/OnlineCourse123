const jwt = require('jsonwebtoken')
const AdminModel = require('../models/Admin')

const admin_auth = async(req,res,next) =>{
    try{
    // console.log('hello admin')
    const{token} = req.cookies
    //console.log(token)
    if(token)
    {
        const verify_token = jwt.verify(token,'abhishekhdcbnsxhdb123')
        // console.log(verify_token)
        const admin_data = await AdminModel.findOne({_id:verify_token.id})
        // console.log(admin_data)
        req.admin = admin_data
        next()
    }else{
        return res.redirect('/login')
    }
    

    }catch(error){
        res.redirect('/login')
    }
}
module.exports = admin_auth