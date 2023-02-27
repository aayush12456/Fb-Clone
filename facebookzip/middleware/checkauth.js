const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("")[5]
        jwt.verify(token, 'secret_this_should_be_longer')
        next()
    } catch (error) {
        res.status(201).json({
            message: 'auth failed'
        })
    }
}