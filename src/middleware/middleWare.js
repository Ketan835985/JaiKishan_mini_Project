const jwt = require('jsonwebtoken')
const { SECRETE_KEY } = require('../../config')


const authorizedCustomer = async (req, res, next) => {
    try {
        const token = req.headers['x-auth-token']
        if(!token) return res.status(403).send({status : false, message : 'Provide token, it is mandatory'})
        const decodedToken = jwt.verify(token, SECRETE_KEY)
        if(!decodedToken) return res.status(403).send({status : false, message : 'token verification failed'})
        req.customerID = decodedToken.customerID
        next()

    } catch (error) {
        res.status(400).send({status : false, message : error.message})
    }
}

module.exports = {authorizedCustomer}