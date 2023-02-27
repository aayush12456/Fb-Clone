const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const user = require('../models/user')
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailorphone: req.body.emailorphone,
            password: hash,
            date: req.body.date
        })
        user.save().then(result => {
            console.log(result)
            return res.status(201).json({
                message: 'data submitted successfully'
            })
        }).catch(err => {
            return res.status(500).json({
                message: 'Auth failed',
                error: err
            })
        })

    })
})
router.post('/login', (req, res, next) => {
    User.findOne({ emailorphone: req.body.emailorphone }).then(user => {
        if (!user) {
            console.log(user)
            return res.status(401).json({
                message: 'Auth Failed'
            })
        }
        return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
        if (!result) {
            console.log(result)
            return res.status(401).json({
                message: 'Auth Failed',
                result: result
            })
        }
        const token = jwt.sign({ emailorphone: user.emailorphone, UserId: user.id }, 'SECRET_MIDDLEWARE', { expiresIn: '1h' })
        console.log(token)
        return res.status(200).json({
            token: token,
            expiresIn: 360000
        })
    }).catch(error => {
        return res.status(401).json({
            message: 'Auth Failed',
            err: error
        })
    })
})
module.exports = router
