const mongoose = require('mongoose');

const tierListSchema = new mongoose.Schema({

    albumName:{
        type: String,
        required: true
    },

    tier: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: true,
        default: "No explanation needed."
    },

    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }

})

//When we export this into a diff file, .model allows direct interaction into db & Schema
module.exports = mongoose.model('tierList', tierListSchema)