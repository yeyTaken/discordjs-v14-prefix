const { Schema, model } = require("mongoose");

let userSchema = new Schema({
  
    idU: { 
        type: String,
        required: true,
        unique: true,
    },

    registrado: {
        type: Boolean,
        default: false
    },

    coins: {
        type: Number,
        default: 0
    },

});

module.exports = model('Users', userSchema);