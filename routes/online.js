var express = require('express');
var router = express.Router();
var FB = require('fb');
FB.options({appSecret:'448fbdd4a888c54a8bc58f987c25a23e'});

router.post('/', function(req, res, next) {
 	global.waitList[req.body.uid]=req.body.tok;
 	console.log(waitList);
	FB.setAccessToken(req.body.tok);
	/* make the API call */

	FB.api(
	    "/"+req.body.uid+"/friends",	
	    function (res) {
	      if (res && !res.error) {
	        console.log(res);
	   		return;
	      }
	    }
	);

  	res.send('hooray');
});

module.exports = router;
