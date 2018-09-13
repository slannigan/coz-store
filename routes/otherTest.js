var express = require('express');
var router = express.Router();

router.get('/other_test', (req, res) => {
	res.send('Other test!');
});

module.exports = router;
