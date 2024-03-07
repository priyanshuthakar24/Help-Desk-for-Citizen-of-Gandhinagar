const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const { validationResult } = require('express-validator');

exports.getAdminLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/adminlogin', { pagetitle: 'Login', path: '/admin/login', errormessage: message, olddata: { email: "", password: "" } });
}
exports.postAdminLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(402).render('auth/adminlogin', { pagetitle: 'Login', path: '/admin/login', errormessage: errors.array()[0].msg, olddata: { email: email, password: password } })
    }
    Admin.findOne({ email: email }).then(data => {
        // if (!data) {
        //     req.flash('error', 'Invalid email or password ');
        //     return res.redirect('/admin/login');
        // }
        bcrypt.compare(password, data.password).then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                // req.session.user = data;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/admin/home');
                });
            }
            // req.flash('error', 'Invalid email or password ');
            res.redirect('/admin/login');
        }).catch(err => {
            console.log(err);
            res.redirect('/admin/login');
        });

    }).catch(err => {
        console.log(err);
    });
};
exports.postAdminLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/admin/login');
    });
};