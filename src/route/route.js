const router = require('express').Router()
const { authorizedCustomer } = require('../middleware/middleWare')
const { createCustomer, getCustomer, DeleteCustomer, customerLogin } = require('../controllers/customerController')
const { getCard, createCard } = require('../controllers/cardController')


router.get('/test', (req,res)=>{
    res.status(200).send("Hello Express")
})

router.post('/customer' , createCustomer)
router.get('/customer', authorizedCustomer, getCustomer)
router.delete('/customer/:customerId',authorizedCustomer, DeleteCustomer)
router.post('/login', customerLogin)
router.post('/card',authorizedCustomer, createCard)
router.get('/card',authorizedCustomer, getCard)
module.exports = router