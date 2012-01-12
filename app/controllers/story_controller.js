load('application');

action('contents', function () {
    var request = require('request');
	var $ = require('jquery'); 
	
	var story_query = {
		uri : 'http://viewtext.org/api/text?url=' + req.query.url + '&format=json',
		json : true,
		method : 'GET'
	}

 	request(story_query, function(error, response, body) {
	
		var url = response.body.url;
		var pathArray = url.split( '/' );
		var thsHost = pathArray[2];
	
		render({
	        title: "Story",
			returnedTitle: response.body.title,
			content: response.body.content,
			url: response.body.url,
			host: thsHost
	    });
	});
});