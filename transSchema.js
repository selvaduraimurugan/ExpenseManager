const mongoose = require('mongoose');

const TransSchema = mongoose.Schema({
    txn_id : {
        type : String,
        required : true,
        lowercase:true
    },
    rrn : {
        type : String,
        required : true
    },
    payer : {
        type : String,
        required : true
    },
    payee : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    amount : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('transaction',TransSchema);