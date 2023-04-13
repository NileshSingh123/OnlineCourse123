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
const router = express.Router();


//route path
router.get("/",FrontController.index);
router.get("/about",FrontController.about);
router.get("/courses",FrontController.courses);
router.get("/blog",FrontController.blog);
router.get("/contact",FrontController.contact);
router.get("/login",FrontController.login);
router.get("/visite",FrontController.visite);
router.get("/course-details/:id",FrontController.coursedetails);
router.get("/course-list",FrontController.courselist);
router.get("/event-details/:id",FrontController.eventdetails);
router.get("/instructor",FrontController.instructor);
router.get('/placement',FrontController.placement)
router.post('/verifylogin',FrontController.verify)
  

// admin router
router.get('/admin/dashboard',AdminController.dashboard)


//course controoler 
router.get('/admin/course/coursedisplay',CourseController.coursedisplay)
router.post('/insertcourses',CourseController.insertcourses)
router.get('/admin/courseview/:id',CourseController.view)
router.get('/admin/courseedit/:id',CourseController.edit)
router.post('/courseupdate/:id',CourseController.courseupdate)
router.get('/admin/coursedelete/:id',CourseController.coursedelete)

//home controller
router.get('/admin/home/slider/sliderdisplay',SliderController.sliderdisplay)
router.post('/sliderinsert',SliderController.sliderinsert)
router.get('/admin/sliderview/:id',SliderController.view)
router.get('/admin/slideredit/:id',SliderController.edit)
router.post('/sliderupdate/:id',SliderController.sliderupdate)
router.get('/admin/sliderdelete/:id',SliderController.sliderdelete)


//student controller
router.post('/student_insert',StudentController.student_insert)
router.get('/admin/student/studentdisplay',StudentController.studentdisplay)
router.get('/admin/studentview/:id',StudentController.view)
router.get('/admin/studentdelete/:id',StudentController.studentdelete)

//batch cotroller
router.get('/admin/batch/batchdisplay',BatchController.batchdisplay)
router.post('/batch_insert',BatchController.batch_insert)
router.get('/admin/batchview/:id',BatchController.view)
router.get('/admin/batchedit/:id',BatchController.edit)
router.post('/batchupdate/:id',BatchController.batchupdate)
router.get('/admin/batchdelete/:id',BatchController.batchdelete)

//about controller
router.get('/admin/about/aboutdispay',AboutController.aboutdisplay)
router.post('/about_insert',AboutController.about_insert)
router.get('/admin/aboutview/:id',AboutController.view)
router.get('/admin/aboutedit/:id',AboutController.edit)
router.post('/aboutupdate/:id',AboutController.about_update)
router.get('/admin/aboutdelete/:id',AboutController.aboutdelete)


//contact controller
router.get('/admin/contact/contactdisplay',ContactController.contactdisplay)
router.post('/contact_insert',ContactController.contact_insert)
router.get('/admin/contactdelete/:id',ContactController.contactdelete)
router.get('/admin/contactview/:id',ContactController.view)



//placement controller
router.get('/admin/placement/placementdisplay',PlacementController.placementdisplay)
router.post('/placement_insert',PlacementController.placement_insert)
router.get('/admin/placementview/:id',PlacementController.view)
router.get('/admin/placementedit/:id',PlacementController.edit)
router.post('/placementupdate/:id',PlacementController.placementupdate)
router.get('/admin/placementdelete/:id',PlacementController.placementdelete)




  module.exports=router