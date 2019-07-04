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

module.exports = router;