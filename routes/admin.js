const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const { route } = require('./user');


router.get('/home', isAuth, admincontroller.getindex);
router.get('/adddept', isAuth, admincontroller.getadddeptform)
router.post('/deptdata', isAuth, admincontroller.postData);
router.get('/addlocation', isAuth, admincontroller.getaddlocation);
router.post('/locationdata', isAuth, admincontroller.postdeptdata);
router.get('/addsolution', isAuth, admincontroller.getsolution);
router.post('/addsolution', isAuth, admincontroller.postsolution)
router.get('/addattachment', isAuth, admincontroller.getattachment);
router.post('/addattachment', isAuth, admincontroller.postattachment);
router.get('/addevent', isAuth, admincontroller.getevent);
router.post('/addevent', isAuth, admincontroller.postevent);
router.get('/editdept', isAuth, admincontroller.geteditlist);
router.post('/editdept', isAuth, admincontroller.posteditform);
router.post('/editdetail', isAuth, admincontroller.posteditdata);
router.get('/editnews', isAuth, admincontroller.getnewslist);
router.post('/editnewsinfo', isAuth, admincontroller.getnewsinfo);
router.post('/editednewsinfo', isAuth, admincontroller.posteditnews);
router.post('/removenews', isAuth, admincontroller.removenews);
router.get('/editsolution', isAuth, admincontroller.geteditfaq);
router.post('/faqlist', isAuth, admincontroller.getfaqlist);
router.post('/editfaq', isAuth, admincontroller.geteditfaqform);
router.post('/postfaqedit', isAuth, admincontroller.posteditfaqform);
router.post('/removefaq', isAuth, admincontroller.removefaq);
router.get('/newsdata', isAuth, admincontroller.newsdata);
router.post('/removeusernews', isAuth, admincontroller.removenewsdata);
module.exports = router;