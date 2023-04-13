const  mongoose  = require('mongoose')
const monggose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/OnlineCourse'
const live_url ="mongodb+srv://ns800622:ram123@cluster0.h12n832.mongodb.net/OnlineCourse?retryWrites=true&w=majority"




const connectDB =()=>{
    return mongoose.connect(live_url)



    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB