const Dept = require('../models/department');

exports.getindex = (req, res, next) => {
    res.render('user/index');
}
exports.getdept = (req, res, next) => {
    const building = req.body.building;
    Dept.find({ building: building }).then(data => {
        console.log(data);
        res.render('user/deptlist', { deptdata: data });
    }).catch(err => { console.log(err) })
}
exports.getinfo = (req, res, next) => {
    const deptname = req.body.deptname;
    Dept.findOne({ name: deptname }).then(data => {
        // console.log(data);
        res.render('user/deptinfo', { deptinfo: data })
    }).catch(err => { console.log(err) })

}
exports.getdata = (req, res, next) => {
    res.render('user/data');
}