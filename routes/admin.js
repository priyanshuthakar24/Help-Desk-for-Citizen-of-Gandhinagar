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
module.exports = router;