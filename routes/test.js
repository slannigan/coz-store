var express = require('express');
var router = express.Router();

router.get('/test', (req, res) => {
	res.send('Test!');
});

module.exports = router;
