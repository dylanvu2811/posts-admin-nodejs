const express = require('express');
const router = express.Router();
const post_md = require('../models/post');

router.get('/', (req, res) => {

    const data = post_md.getAllPost();
    data.then((posts) => {
        const result = {
            posts: posts,
            error: false
        };
        res.render('blog/index', {data: result});
    }).catch((err) => {
        const result =  {
            error: 'could not get posts data'
        };
        res.render('blog/index', {data: result});
    });

});

router.get('/post/:id', (req, res) => {

    const data = post_md.getPostById(req.params.id);
    data.then((posts) => {
        const post = posts[0]
        const result = {
            post: post,
            error: false
        };
        res.render('blog/post', {data: result});
    }).catch((err) => {
        const result =  {
            error: 'could not get posts detail'
        };
        res.render('blog/post', {data: result});
    });

});

router.get('/about', (req, res) => {

    res.render('blog/about');

});

module.exports = router;