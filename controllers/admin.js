const department = require('../models/department');
const Dept = require('../models/department');
const Announcment = require('../models/eventdata');
const NewsData = require('../models/newsdata');

// home page loading function >>>>
exports.getindex = (req, res, next) => {
    res.render('admin/home', { pagetitle: 'Home' });
}
// add department page function >>>>>>
exports.getadddeptform = (req, res, next) => {
    res.render('admin/adddeptform', { editing: false, olddata: { name: "", mobileno: '', url: '', email: '' }, pagetitle: 'Add Department' });
}
exports.postData = (req, res, next) => {
    const buildingname = req.body.buildingname;
    const name = req.body.name;
    const mobileno = req.body.mobileno;
    const email = req.body.email
    const url = req.body.url;
    const imageurl = req.body.imageurl;
    const address = req.body.address;
    const name_location = req.body.name_location;
    const mobileno_location = req.body.mobileno_location;
    const openingtime = req.body.openingtime;
    const closingtime = req.body.closingtime;
    Dept.findOne({ email: email }).then(result => {
        const data = new Dept({
            building: buildingname, name: name, mobileno: mobileno, email: email, url: url, profilimage: imageurl, locations: [{ address: address, personname: name_location, opentime: openingtime, closetime: closingtime, mobilenolocation: mobileno_location }]
        })
        return data.save();
    }).then(result => {
        res.redirect('/admin/home');
    }).catch(err => { console.log(err) });
}


// add location function paegloading >>>>>>>>>>
exports.getaddlocation = (req, res, next) => {
    res.render('admin/addlocation', { pagetitle: 'Add Location' });
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


// add solution function loading page >>>>>>
exports.getsolution = (req, res, next) => {
    res.render('admin/addquery', { editing: false, olddata: { email: '', question: '', solution: '' }, pagetitle: 'Add Solution' });
}
exports.postsolution = (req, res, next) => {
    const email = req.body.email;
    const question = req.body.question;
    const answer = req.body.answer;

    Dept.findOne({ email: email }).then(data => {
        let updatdata = [...data.query]
        // console.log(updatdata)
        if (updatdata.length === 0) {
            const incrementid = 1
            updatdata.push({ question: question, solution: answer, id: incrementid })
            // console.log(incrementid)
        } else {
            const incrementid = updatdata[updatdata.length - 1].id + 1
            // console.log(incrementid)
            updatdata.push({ question: question, solution: answer, id: incrementid })
        }
        // console.log(updatdata.length);
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

// add Attachment page load function>>>>>>
exports.getattachment = (req, res, next) => {
    res.render('admin/attachment', { pagetitle: 'Add Attachment' })
}

exports.postattachment = (req, res, next) => {
    const email = req.body.email;
    const id = req.body.attachmentid;
    const attachmentname = req.body.attachmentname;
    const attachmentlink = req.body.attachmentlink;

    Dept.findOne({ email: email }).then(data => {
        const updatdata = [...data.query]
        updatdata[id - 1].attachment.push({ attachmentname: attachmentname, attachmentlink: attachmentlink })
        console.log(updatdata);
        data.query = updatdata
        return data.save();

    }).then(result => {
        console.log(result);
        console.log('done sucessfully');
        res.redirect('/admin/home');
    }).catch(err => {
        console.log(err);
    })
}

// add nenwsevent function page load >>>>>

exports.getevent = (req, res, next) => {
    res.render('admin/addeventnews', { editing: false, olddata: { name: '', description: '' }, pagetitle: 'Add News Event' });
}

exports.postevent = (req, res, next) => {
    const catogary = req.body.typeofnews;
    const headingname = req.body.headingname;
    const description = req.body.description;
    const attachment = req.body.attachmentlink;

    const data = new Announcment({ catagory: catogary, eventname: headingname, descrtption: description, attachment: attachment })
    data.save();
    return res.redirect('/admin/home');
}

// edit department function [>>>>>>>>>>>>>

exports.geteditlist = (req, res, next) => {
    Dept.find().then(data => {
        res.render('admin/deptlist', { keydata: data, editing: false, pagetitle: 'DeptList' })
    }).catch(err => { console.log(err) });
}
// editd depatment form page load >>
exports.posteditform = (req, res, next) => {
    const name = req.body.dname
    Dept.findOne({ name: name }).then(data => {
        res.render('admin/adddeptform', { editing: true, product: data, pagetitle: 'Edit Department' });
    })
}
// post edit data change in database function>>>>
exports.posteditdata = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const mobileno = req.body.mobileno;
    const email = req.body.email;
    const url = req.body.url;
    Dept.findById(id).then(data => {
        data.name = name;
        data.email = email;
        data.mobileno = mobileno;
        data.url = url;
        return data.save();
    }).then(result => {
        console.log(result)
        res.redirect('/admin/home');
    })
}
//  edit department function end ]]]]]] 

// edit and Remove news function start [[[[[
exports.getnewslist = (req, res, next) => {
    Announcment.find().then(data => {
        res.render('admin/newslist', { pagetitle: 'Newslist', listdata: data });
    }).catch(err => { console.log(err) });
}
// edit news list form >>
exports.getnewsinfo = (req, res, next) => {
    const id = req.body.id;
    Announcment.findById(id).then(data => {
        res.render('admin/addeventnews', { product: data, editing: true, pagetitle: 'Edit news list' });
    }).catch(err => { console.log(err) });
}
// change in database post edit news function >>>>.
exports.posteditnews = (req, res, next) => {
    const id = req.body.newsid;
    const name = req.body.headingname;
    const description = req.body.description;
    Announcment.findById(id).then(data => {
        console.log('data');
        data.eventname = name;
        data.descrtption = description;
        data.save();
    }).then(result => {
        res.redirect('/admin/home');
    }).catch(err => { console.log(err) });
}

// Delete news form databse function 
exports.removenews = (req, res, next) => {
    const id = req.body.id;
    Announcment.findByIdAndDelete(id).then(data => {
        res.redirect('/admin/editnews');
    }).catch(err => { console.log(err) });
}
// edit and remove news ends ]]]]]]

// edit and Remove faq function start [[[[[[[

// deptlist function >>>>
exports.geteditfaq = (req, res, next) => {
    Dept.find().then(data => {
        res.render('admin/deptlist', { keydata: data, editing: true, pagetitle: 'DeptList' })
    }).catch(err => { console.log(err) });
}
// load  faq list of selected department function >>>
exports.getfaqlist = (req, res, next) => {
    const name = req.body.dname;
    Dept.findOne({ name: name }).then(data => {
        res.render('admin/faqlist', { pagetitle: 'faqlist', keydata: data });
    }).catch(err => { console.log(err) });
}
// edit form for selected faq function >>>>
exports.geteditfaqform = (req, res, next) => {
    const id = req.body.id;
    const kid = req.body.kid;
    console.log(kid);
    Dept.findById(kid).then(data => {
        const updata = [...data.query];
        const newdata = updata.filter(info => {
            return info._id.toString() === id.toString()
        })
        console.log(newdata);
        res.render('admin/addquery', { editing: true, product: newdata, pagetitle: 'Edit Query' })
    })
}
// change in database for edited faq post function >>>
exports.posteditfaqform = (req, res, next) => {
    const id = req.body.id;
    const qid = req.body.qid;
    const question = req.body.question;
    const solution = req.body.answer;


    Dept.findOne({ 'query._id': id }).then(data => {
        console.log(id);
        console.log(data);
        const updatedata = [...data.query];
        const newdata = updatedata[qid - 1]
        newdata.question = question;
        newdata.solution = solution;
        updatedata[qid - 1] = newdata;
        data.query = updatedata;
        return data.save();
    }).then(result => {
        console.log(result);
        res.redirect('/admin/home');
    }).catch(err => { console.log(err) });
}

// Delete Function for selected faq >>>>
exports.removefaq = (req, res, next) => {
    const id = req.body.id;
    console.log(id);
    const fid = req.body.fid;
    Dept.findById(fid).then(data => {
        console.log(data);
        let updatdata = [...data.query]
        const newdata = updatdata.filter(info => {
            return info._id.toString() !== id.toString()
        })
        console.log(newdata)
        updatdata = newdata;
        data.query = updatdata;
        return data.save();
    }).then(result => {
        res.redirect('/admin/home')
    })
}
//  Edit and Remove function for Faq iend ]]]]]]]]]]



exports.newsdata = (req, res, next) => {
    NewsData.find().then(data => {
        res.render('admin/newsdatalist', { pagetitle: 'News List', headtitle: 'News List', dataresult: data });
    })
}
exports.removenewsdata = (req, res, next) => {
    const id = req.body.id;
    NewsData.findByIdAndDelete(id).then(data => {
        res.redirect('/admin/home');
    }).catch(err => { console.log(err) });

}

// logic for add file in arry in attachment section
// const qesdata = updatdata.filter(item => {
//     return item.id.toString() === id.toString();
// })
// const olddata = qesdata[0].attachment
// const newdata = qesdata[0]
// updatdata[id-1]=newdata;
// console.log(olddata);