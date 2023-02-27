const express = require('express')
const router = express.Router()
const Post = require('../models/post')
router.post('', (req, res, next) => {
    const post = new Post({
        content: req.body.content
    })
    console.log(post)
    post.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'your data submitted successfully',
            res: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Data does not enter to database',
            error: err
        })
    })
})
router.get('/get', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'post deliver successfully',
            data: documents
        })
    })
})
module.exports = router