const router = require('express').Router()
const { createCard, getCard } = require('../controller/cardController')
const { createCustomer, getCustomer, DeleteCustomer } = require('../controller/customerController')



router.get('/test', (req,res)=>{
    res.status(200).send("Hello Express")
})

router.post('/customer' , createCustomer)
router.get('/customer', getCustomer)
router.delete('/customer/:customerId', DeleteCustomer)

router.post('/card', createCard)
router.get('/card', getCard)
module.exports = router