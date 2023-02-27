const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const UserRoutes = require('../routes/user')
const postRoutes = require('../routes/post')
const { default: mongoose } = require('mongoose')
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://localhost:27017/data-chatapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected successfully')
}).catch(err => {
    console.log('unavle to connect database', err)
})
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use('/api/post', postRoutes)
app.use('/api/user', UserRoutes)
module.exports = app