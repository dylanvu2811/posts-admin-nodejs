const express = require('express');
const router = express.Router();
const user_md = require('../models/user');
const post_md = require('../models/post');
const helper = require('../helpers/helper');

router.get('/', (req, res) => {

    const data = post_md.getAllPost();
    data.then((posts) => {
        const data = {
            posts: posts,
            error: false
        };
        res.render('admin/dashboard', {data: data});
    }).catch((err) => {
        res.render('admin/dashboard', {data: {error: "get post data is false"}});
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {data: {}});
});

router.get('/signin', (req, res) => {
    res.render('signin', {data: {}});
});

router.post('/signup', (req, res) => {

    let user = req.body;

    if(user.email.trim().length == 0 ){
        res.render('signup', {data: {error: 'Email is required'}});
    }

    if(user.passwd != user.repasswd && user.passwd.trim().length != 0 ){
        res.render('signup', {data: {error: 'password is not match'}});
    }


    // insert to database
    const password = helper.hash_password(user.passwd);
    user = {
        email: user.email,
        password: password,
        first_name: user.firstname,
        last_name: user.lastname
    };
    
    const result = user_md.addUser(user);

    result.then((data) => {
        res.redirect("/admin/signin");
    }).catch((err) => {
        res.render('signup', {data: {error: 'insert false'}});
    });
 

});

router.post('/signin', (req, res) => {

    let params = req.body;

    if(params.email.trim().length == 0 ){
        res.render('signin', {data: {error: 'pls enter an email'}});
    } else {
        const data = user_md.getUserByEmail(params.email);
        if (data) {
            data.then((users) => {
                const user = users[0];
                const  stt = helper.compare_password(params.password, user.password);

                if(!stt) {
                    res.render("signin", {data: {error:"passs wrong"}});
                }else {
                    res.redirect("/admin/");
                }
            });
        }else {
            res.render("signin", {data: {error:"user not exists"}});
        }
    }
});


router.get('/post/new', (req, res) => {
    res.render('admin/post/new', {data: {error: false}});
});
router.post('/post/new', (req, res) => {
    const params = req.body;

    if(params.title.trim().length == 0) {
        const data = {
            error: "pls enter title"
        };
        res.render('admin/post/new', {data: data});
    } else {
        const now = new Date();
        params.created_at = now;
        params.updated_at = now;

        const data = post_md.addPost(params);
        data.then((result) => {
            res.redirect('/admin');
        }).catch((err) => {
            const data = {
                error: 'insert false'
            };
            res.render('admin/post/new', {data: data});
        });
    }

    

});
module.exports = router;