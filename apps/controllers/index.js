const express = require('express');

const router = express.Router();

router.use('/admin', require(__dirname + '/admin.js'));
router.use('/blog', require(__dirname + '/blog.js'));

router.get('/', (req, res) => {
    // res.json({'message': 'this is homepage'});
    res.render('signup');
});

module.exports = router;