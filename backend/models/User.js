const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Silahkan isikan nama'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([.-]?\w+)*@\w+(\.\w{2,3})+$/, 'Silahkan isikan email valid!']
    }
})

module.exports = mongoose.model('User', userSchema)