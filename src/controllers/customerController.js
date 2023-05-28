const customerModel = require('../Model/customerModel')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { SECRETE_KEY } = require('../../config')


// console.log(validator.isDate("06-06-2000")) false// use YYYY-MM-DD for true
const createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, mobileNumber, DOB, address, emailID } = req.body
        if (!firstName || !lastName || !mobileNumber || !DOB || !address || !emailID ) return res.status(400).send({ status: false, message: "Provide all required fields" })
        if (!validator.isEmail(emailID)) return res.status(400).send({ status: false, message: 'Email is invalid' })
        if(!validator.isDate(DOB)) return res.status(400).send({ status: false, message: 'DOB is not a valid date' })
        if (mobileNumber.length !== 10) return res.status(400).send({ status: false, message: 'Mobile number must be 10 digits long' })
        const existCustomer = await customerModel.findOne({ mobileNumber: mobileNumber })
        if (existCustomer) return res.status(400).send({ status: false, message: `${mobileNumber} already exists ` })
        const emailCustomer = await customerModel.findOne({ emailID: emailID })
        if (emailCustomer) return res.status(400).send({ status: false, message: `${emailID} already exists ` })
        else {
            const customer = await customerModel.create(req.body)
            res.status(201).send({ status: true, customer: customer })
        }
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const customerLogin = async (req, res) => {
    try {
        const { emailID, DOB } = req.body
        if (!emailID) return res.status(400).send({ status: false, message: 'Provide a email Id' })
        if (!DOB) return res.status(400).send({ status: false, message: 'Provide a Date of Birth for login in YYYY-MM-DD' })
        const customer = await customerModel.findOneAndUpdate({ emailID: emailID, DOB: DOB }, {$set : {status : "ACTIVE"}})
        if (!customer) return res.status(400).send({ status: false, message: 'NO such customer' })
        const token = jwt.sign({ customerID: customer._id }, SECRETE_KEY)
        if (!token) return res.status(400).send({ status: false, message: 'token Not yet Generate' })
        res.status(200).send({ status: true, token: token })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const getCustomer = async (req, res) => {
    try {
        const allCustomerDetails = await customerModel.find({ _id: req.customerID, status: "ACTIVE" })
        if(allCustomerDetails.length === 0) return res.status(404).send({ status: false, message: 'No such customer' })
        res.status(200).send({ status: true, customer: allCustomerDetails })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const DeleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId
        const customer = await customerModel.findOne({ _id: customerId, status: "ACTIVE" })
        if (customerId != req.customerID) return res.status(400).send({ status: false, message: 'Unauthorized Customer for Delete' })
        if (!customer) return res.status(404).send({ status: false, message: "Customer does not exist " })
        const deleteCustomer = await customerModel.findOneAndUpdate({ _id: customer, status: "ACTIVE" }, { $set: { status: "INACTIVE" } }, { new: true })
        res.status(200).send({ status: true, customer: deleteCustomer })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createCustomer, getCustomer, DeleteCustomer, customerLogin }