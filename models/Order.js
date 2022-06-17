const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    produkt: {
        type: String,
        required: true
    },
    ilosc: {
        type: Number,
        required: true,
        min: 1
    }, 
    status: {
        type: String,
        default: 'oczekujace'
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order',OrderSchema);

