const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    order_data: [
    {
      Order_date: { type: String, required: true },
      items: { type: Array, required: true }
    }
]

});

module.exports = mongoose.model('order', OrderSchema)