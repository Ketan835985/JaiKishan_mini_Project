const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return value.length === 10;
            },
            message: 'Mobile number must be 10 characters long.'
        }
    },
    DOB: Date,
    emailID: {
        type: String,
        unique: true,
    },
    address: String,
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"]
    }
}, { timestamps: true });


module.exports = mongoose.model('Customer', customerSchema)