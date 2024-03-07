const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user');

router.get('/', usercontroller.getindex);
router.get('/data', usercontroller.getdata);
router.post('/dept', usercontroller.getdept);
router.post('/deptinfo', usercontroller.getinfo);
router.post('/jobnews', usercontroller.getjobnews);
router.post('/culturenews', usercontroller.getculturenews);
router.get('/submitnews', usercontroller.getnewsform);
router.post('/submitnews', usercontroller.postnewsform);

module.exports = router;