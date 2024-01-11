const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user');

router.get('/', usercontroller.getindex);
router.get('/data', usercontroller.getdata);
router.post('/dept',usercontroller.getdept);
router.post('/deptinfo',usercontroller.getinfo);
module.exports = router;