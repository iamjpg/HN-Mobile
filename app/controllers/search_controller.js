load('application');

action('frontpage', function () {
	layout(false);
    var request = require('request');
	
	var hn_query = {
		uri : 'http://api.ihackernews.com/page',
		json : true,
		method : 'GET'
	}

 	request(hn_query, function(error, response, body) {
		res.contentType('json');
		res.send(response.body);
	});
});