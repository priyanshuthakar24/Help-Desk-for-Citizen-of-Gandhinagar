const Dept = require('../models/department');
const Eventdata = require('../models/eventdata');
const Newsdata = require('../models/newsdata');
exports.getindex = (req, res, next) => {
    res.render('user/index', { pagetitle: 'Home' });
}
exports.getdept = (req, res, next) => {
    const building = req.body.building;
    Dept.find({ building: building }).then(data => {
        console.log(data);
        res.render('user/deptlist', { deptdata: data, pagetitle: 'Department List' });
    }).catch(err => { console.log(err) })
}
exports.getinfo = (req, res, next) => {
    const deptname = req.body.deptname;
    Dept.findOne({ name: deptname }).then(data => {
        // console.log(data);
        res.render('user/deptinfo', { deptinfo: data, pagetitle: 'Department Info' });
    }).catch(err => { console.log(err) })

}
exports.getdata = (req, res, next) => {
    res.render('user/data');
}
exports.getjobnews = (req, res, next) => {
    const eventdat = req.body.newstype;
    Eventdata.find({ catagory: eventdat }).then(data => {
        res.render('user/announcement', { dataresult: data, pagetitle: 'Job Announcement', headtitle: 'Job Alert' });
        console.log(data);
    }).catch(err => { console.log(err) });
}
exports.getculturenews = (req, res, next) => {
    const eventdat = req.body.newstype;
    Eventdata.find({ catagory: eventdat }).then(data => {
        res.render('user/announcement', { dataresult: data, pagetitle: 'Culture Annoncement', headtitle: 'Event Alert' });
        console.log(data);
    }).catch(err => { console.log(err) });
}

exports.getnewsform = (req, res, next) => {
    res.render('user/newsform', { headtitle: 'NewsForm', editing: false, pagetitle: 'News form', olddata: { name: '', description: '' } });
}

exports.postnewsform = (req, res, next) => {
    const mobileno = req.body.mobileno;
    const headingname = req.body.headingname;
    const description = req.body.description;
    const attachment = req.body.attachmentlink;

    const data = new Newsdata({ mobileno: mobileno, eventname: headingname, descrtption: description, attachment: attachment })
    data.save();
    return res.redirect('/');
}