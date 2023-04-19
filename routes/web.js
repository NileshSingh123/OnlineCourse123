const express = require('express');
const AboutController = require('../controllers/admin/AboutController');
const AdminController = require('../controllers/admin/AdminController');
const BatchController = require('../controllers/admin/BatchController');
const CourseController = require('../controllers/admin/CourseController');
const SliderController = require('../controllers/admin/home/SliderController');
const StudentController = require('../controllers/admin/StudentController');
const FrontController= require('../controllers/FrontController');
const ContactController = require('../controllers/admin/ContactController');
const PlacementController = require('../controllers/admin/PlacementController');
const admin_auth = require('../middleware/auth')
const router = express.Router();


//route path
router.get("/",FrontController.index);
router.get("/about",FrontController.about);
router.get("/courses",FrontController.courses);
router.get("/blog",FrontController.blog);
router.get("/contact",FrontController.contact);
router.get("/login",FrontController.login);
router.get("/resister",FrontController.resister);
router.get("/visite",FrontController.visite);
router.get("/course-details/:id",FrontController.coursedetails);
router.get("/course-list",FrontController.courselist);
router.get("/event-details/:id",FrontController.eventdetails);
router.get("/instructor",FrontController.instructor);
router.get('/placement',FrontController.placement)

// router.post('/verifylogin',FrontController.verify)
  

// admin router
router.get('/admin/dashboard',admin_auth,AdminController.dashboard)
router.post('/adminresister',admin_auth,AdminController.admininsert)
router.post('/verify_login',AdminController.verifylogin)
router.get('/logout',AdminController.logout)
router.post('/adminchangepassword',admin_auth,AdminController.updatePassword)
router.get('/changepassword',admin_auth,AdminController.changepassword)


//course controoler 
router.get('/admin/course/coursedisplay',admin_auth,CourseController.coursedisplay)
router.post('/insertcourses',admin_auth,CourseController.insertcourses)
router.get('/admin/courseview/:id',admin_auth,CourseController.view)
router.get('/admin/courseedit/:id',admin_auth,CourseController.edit)
router.post('/courseupdate/:id',admin_auth,CourseController.courseupdate)
router.get('/admin/coursedelete/:id',admin_auth,CourseController.coursedelete)

//home controller
router.get('/admin/home/slider/sliderdisplay',admin_auth,SliderController.sliderdisplay)
router.post('/sliderinsert',admin_auth,SliderController.sliderinsert)
router.get('/admin/sliderview/:id',admin_auth,SliderController.view)
router.get('/admin/slideredit/:id',admin_auth,SliderController.edit)
router.post('/sliderupdate/:id',admin_auth,SliderController.sliderupdate)
router.get('/admin/sliderdelete/:id',admin_auth,SliderController.sliderdelete)


//student controller
router.post('/student_insert',admin_auth,StudentController.student_insert)
router.get('/admin/student/studentdisplay',admin_auth,StudentController.studentdisplay)
router.get('/admin/studentview/:id',admin_auth,StudentController.view)
router.get('/admin/studentdelete/:id',admin_auth,StudentController.studentdelete)

//batch cotroller
router.get('/admin/batch/batchdisplay',admin_auth,BatchController.batchdisplay)
router.post('/batch_insert',admin_auth,BatchController.batch_insert)
router.get('/admin/batchview/:id',admin_auth,BatchController.view)
router.get('/admin/batchedit/:id',admin_auth,BatchController.edit)
router.post('/batchupdate/:id',admin_auth,BatchController.batchupdate)
router.get('/admin/batchdelete/:id',admin_auth,BatchController.batchdelete)

//about controller
router.get('/admin/about/aboutdispay',admin_auth,AboutController.aboutdisplay)
router.post('/about_insert',admin_auth,AboutController.about_insert)
router.get('/admin/aboutview/:id',admin_auth,AboutController.view)
router.get('/admin/aboutedit/:id',admin_auth,AboutController.edit)
router.post('/aboutupdate/:id',admin_auth,AboutController.about_update)
router.get('/admin/aboutdelete/:id',admin_auth,AboutController.aboutdelete)


//contact controller
router.get('/admin/contact/contactdisplay',admin_auth,ContactController.contactdisplay)
router.post('/contact_insert',admin_auth,ContactController.contact_insert)
router.get('/admin/contactdelete/:id',admin_auth,ContactController.contactdelete)
router.get('/admin/contactview/:id',admin_auth,ContactController.view)



//placement controller
router.get('/admin/placement/placementdisplay',admin_auth,PlacementController.placementdisplay)
router.post('/placement_insert',admin_auth,PlacementController.placement_insert)
router.get('/admin/placementview/:id',admin_auth,PlacementController.view)
router.get('/admin/placementedit/:id',admin_auth,PlacementController.edit)
router.post('/placementupdate/:id',admin_auth,PlacementController.placementupdate)
router.get('/admin/placementdelete/:id',admin_auth,PlacementController.placementdelete)




  module.exports=router