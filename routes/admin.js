const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/admin');
const { route } = require('./user');


router.get('/home', admincontroller.getindex);
router.get('/adddept', admincontroller.getadddeptform)
router.post('/deptdata', admincontroller.postData);
router.get('/addlocation', admincontroller.getaddlocation);
router.post('/locationdata', admincontroller.postdeptdata);
router.get('/addsolution', admincontroller.getsolution);
router.post('/addsolution', admincontroller.postsolution)
router.get('/addattachment', admincontroller.getattachment);
router.post('/addattachment', admincontroller.postattachment);
router.get('/addevent', admincontroller.getevent);
router.post('/addevent', admincontroller.postevent);
router.get('/editdept', admincontroller.geteditlist);
router.post('/editdept', admincontroller.posteditform);
router.post('/editdetail', admincontroller.posteditdata);
router.get('/editnews', admincontroller.getnewslist);
router.post('/editnewsinfo', admincontroller.getnewsinfo);
router.post('/editednewsinfo', admincontroller.posteditnews);
router.post('/removenews', admincontroller.removenews);
router.get('/editsolution', admincontroller.geteditfaq);
router.post('/faqlist', admincontroller.getfaqlist);
router.post('/editfaq', admincontroller.geteditfaqform);
router.post('/postfaqedit', admincontroller.posteditfaqform);
router.post('/removefaq', admincontroller.removefaq);
module.exports = router;