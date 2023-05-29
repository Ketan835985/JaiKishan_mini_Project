const mongoose = require('mongoose');
var UUID = mongoose.Types.UUID;
/* cardNumber string Auto_increment e.g: C001
cardType String [REGULAR/SPECIAL]
customerName string
status string [ACTIVE/INACTIVE] Default: ACTIVE
vision string
customerID string Reference from customer

table*/

const cardSchema = new mongoose.Schema({
    cardNumber: String,
    cardType: {
        type: String,
        enum: ['REGULAR', 'SPECIAL']
    },
    customerName: String,
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    vision: String,
    customerID: {
        type: UUID,
        ref: 'Customer'
    }

}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema)