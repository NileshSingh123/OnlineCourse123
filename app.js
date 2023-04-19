const express = require('express')
const connectDB = require('./db/connectdb')
const web = require('./routes/web')
var bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');
const cookieParser = require('cookie-parser')

const app = express()
const port = 4500


app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({ extended:  false }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(fileupload({useTempFiles : true}))

//conect_db
connectDB()

//for flash massage show
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized:false,
  }));

app.use(flash());

//route localhost:300
app.use('/',web)

//static files
app.use(express.static('public'))




//server create
app.listen(port, () => {
    console.log('server start local server:3000')
})