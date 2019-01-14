const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
    db.Post.find({})
        .sort('-posted_on')
        .exec(function(error, posts) {
        if (error) throw error;
        console.log(posts);
        response.render('index', {posts: posts});
        });
});

app.post('/post', function(request, response) {
    db.Post.create({
        name: request.body.name,
        content: request.body.postcontent
    }, function(error, post) {
        if (error) throw error;
        response.send(post);
    });
});

app.post('/comment', function(request, response) {
    db.Post.findById(request.body.id, function(error, post){
        post.comments.push({
            name: request.body.name,
            content: request.body.comment
        });
        post.save(function(err, post) {
            if (err) throw err;
            response.send(post.comments[post.comments.length - 1]);
        });
    });
});

app.listen(5000);