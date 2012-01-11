load('application');
var controller_name = 'welcome';

action('index', function () {
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
			//console.log(response.body.items[i]);
		}
		
		render({
	        title: "Front Page",
			data: items_array
	    });
	});
	
});