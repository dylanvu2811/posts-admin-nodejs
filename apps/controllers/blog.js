const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // res.json({'message': 'this is blog'});
    res.render('blog/index');
});

module.exports = router;