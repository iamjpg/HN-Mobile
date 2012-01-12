
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	var request = require('request');
	
	var hn_query = {
		uri : 'http://api.ihackernews.com/page',
		json : true,
		method : 'GET'
	}
	
	request(hn_query, function(error, response, body) {

		var items_array = [];
		for (i=0;i<response.body.items.length;i++) {
			items_array.push(response.body.items[i]);
		}
		
		res.render('index', { 
			title: 'Front Page',
			data: items_array
		});
	});
};

exports.story = function(req, res){
	
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
	
		res.render('story', {
	        title: "Story",
			returnedTitle: response.body.title,
			content: response.body.content,
			url: response.body.url,
			host: thsHost
	    });
	});
	
	//res.render('index', { title: 'Search' })
};