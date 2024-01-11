const Dept = require('../models/department');

exports.getindex = (req, res, next) => {
    res.render('admin/home');
}
exports.getadddeptform = (req, res, next) => {
    res.render('admin/adddeptform');
}
exports.postData = (req, res, next) => {
    const buildingname = req.body.buildingname;
    const name = req.body.name;
    const mobileno = req.body.mobileno;
    const email = req.body.email
    const url = req.body.url;
    const address = req.body.address;
    const name_location = req.body.name_location;
    const mobileno_location = req.body.mobileno_location;
    const openingtime = req.body.openingtime;
    const closingtime = req.body.closingtime;
    Dept.findOne({ email: email }).then(result => {
        const data = new Dept({
            building: buildingname, name: name, mobileno: mobileno, email: email, url: url, locations: [{ address: address, personname: name_location, opentime: openingtime, closetime: closingtime, mobilenolocation: mobileno_location }]
        })
        return data.save();
    }).then(result => {
        res.redirect('/admin/home');
    }).catch(err => { console.log(err) });
}

exports.getaddlocation = (req, res, next) => {
    res.render('admin/addlocation');
}

exports.postdeptdata = (req, res, next) => {
    const email = req.body.email;
    const address = req.body.address;
    const name_location = req.body.name;
    const mobileno_location = req.body.mobileno;
    const openingtime = req.body.openingtime;
    const closingtime = req.body.closingtime;
    Dept.findOne({ email: email }).then(data => {
        const updatdata = [...data.locations]
        updatdata.push({ address: address, personname: name_location, mobilenolocation: mobileno_location, opentime: openingtime, closetime: closingtime });
        data.locations = updatdata;
        return data.save();
    }).then(result => {
        console.log(result);
        console.log('done sucessfully');
        res.redirect('/admin/home');
    }).catch(err => {
        console.log(err);
    });
}

exports.getsolution = (req, res, next) => {
    res.render('admin/addquery');
}
exports.postsolution = (req, res, next) => {
    const email = req.body.email;
    const question = req.body.question;
    const answer = req.body.answer;

    Dept.findOne({ email: email }).then(data => {
        const updatdata = [...data.query]
        updatdata.push({ question: question, solution: answer })
        data.query = updatdata;
        return data.save();
    }).then(result => {
        console.log(result);
        console.log('done sucessfully');
        res.redirect('/admin/home');
    }).catch(err => {
        console.log(err);
    });
}