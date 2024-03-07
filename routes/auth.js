const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth');
const { check } = require('express-validator');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');


router.get('/admin/login', authcontroller.getAdminLogin);
router.post('/admin/login', [check('email', '').isEmail().normalizeEmail().custom((value) => {
    return Admin.findOne({ email: value }).then(data => {
        if (!data) {
            return Promise.reject('email does not found');
        }
    })
}), check('password', 'password should be minimum 4 character long..').isLength({ min: 4 }).custom((value, { req }) => {
    return Admin.findOne({ email: req.body.email }).then(data => {
        return bcrypt.compare(value, data.password).then(doMatch => {
            if (!doMatch) {
                return Promise.reject('password Dose not match');
            }
        })
    })
})], authcontroller.postAdminLogin);
router.post('/admin/logout', authcontroller.postAdminLogout);

module.exports = router;