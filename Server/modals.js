const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    amount: {
        type: Number,
        default: 100000,
    },
    team: {
        type: Array,
        default: [],
    },
    NumberofPlayers: {
        type: Number,
        default: 0,
    },
    want:{
        type:boolean,
        default:0,
    },
    swipe:{
        type:boolean,
        default:0,
    }
});
const User = mongoose.model('User',userSchema);
module.exports = User;