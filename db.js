const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/simplemessageboard');
module.exports.connection = mongoose;

var Comment = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    posted_on: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports.Comment = mongoose.model('Comment', Comment);

var Post = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    posted_on: {
        type: Date,
        default: Date.now,
        required: true
    },
    comments: [Comment]
});

module.exports.Post = mongoose.model('Post', Post);