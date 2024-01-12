const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyparser = require('body-parser');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.c77xwlg.mongodb.net/${process.env.MONGODB_DEFAULT_DATABASE}`;

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
app.use(bodyparser.urlencoded({ limit: '50mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);
app.use('/admin', adminRoutes)

mongoose.connect(MONGODB_URI).then(result => {
    app.listen(3001);
    console.log('Server is listen on 3001');
}).catch(err => { console.log(err) });