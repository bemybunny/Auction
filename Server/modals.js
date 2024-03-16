const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    amount: {
        type: Number,
        default: 10000000,
    },
    team: {
        type: Array,
        default: [],
    },
    RoomId: {
        type: String,
        required:true,
    },
    socketId:{
        type:String,
        required:true,
    },
    position: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;