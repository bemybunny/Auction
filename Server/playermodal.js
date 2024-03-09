const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    index:{
        type:Number,
        default:0,
        required:true,
    },
    name: {
        type: String,
        default: '',
        required:true,
    },
    basePrice: {
        type: Number,
        default: 0,
        required:true,
    },
    credit: {
        type: Number,
        default: 0,
        required:true,
    },
    recentPerformance: {
        type: String, // You can change the type based on the nature of recent performance data
        default: '',
        required:true,
    },
    image: {
        type: String, // Assuming image is stored as a URL or file path
        default: '',
        required:true,
    },
    want: {
        type: Number,
        default: 0,
    },
    visited: {
        type: Boolean,
        default: false,
    }
});

const Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;
