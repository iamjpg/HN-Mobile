
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	var request = require('request');
	
	var hn_query = {
		uri : 'http://hndroidapi.appspot.com/news',
		json : true,
		method : 'GET'
	}
	
	request(hn_query, function(error, response, body) {

		var items_array = [];
		if (typeof response.body.items === 'undefined') {
			items_array.push({
				url : '',
				title : 'Broken',
				commentCount : 0,
				postedBy : 'Broken',
				points : 0
			});
			
			res.render('index', { 
				title: 'Front Page',
				data: "error"
			});
		} else {
			for (i=0;i<response.body.items.length;i++) {
				items_array.push(response.body.items[i]);
			}
			
			res.render('index', { 
				title: 'Front Page',
				data: items_array
			});
		}
		
		items_array = null;
	});
};

exports.gs = function(req, res) {
	var request = require('request');

	var hn_query = {
		uri : 'http://viewtext.org/api/text?url=' + req.query.url + '&format=json',
		json : true,
		method : 'GET'
	}

	request(hn_query, function(error, response, body) {
		res.contentType('json');
		res.send(response.body);
	});
	
	hn_query = null;
};

exports.gc = function (req, res) {
	var request = require('request');

	var hn_query = {
		uri : 'http://hndroidapi.appspot.com/nestedcomments/format/json/id/' + req.query.id,
		json : true,
		method : 'GET'
	}

	request(hn_query, function(error, response, body) {
		res.contentType('json');
		res.send(response.body);
	});
	
	hn_query = null;
}

exports.about = function(req, res) {
	res.render('about', { 
		title: 'About'
	});
}

exports.new = function (req, res) {
	var request = require('request');
	
	var hn_query = {
		uri : 'http://hndroidapi.appspot.com/newest',
		json : true,
		method : 'GET'
	}
	
	request(hn_query, function(error, response, body) {

		var items_array = [];
		if (typeof response.body.items === 'undefined') {
			items_array.push({
				url : '',
				title : 'Broken',
				commentCount : 0,
				postedBy : 'Broken',
				points : 0
			});
			
			res.render('index', { 
				title: 'Front Page',
				data: "error"
			});
		} else {
			for (i=0;i<response.body.items.length;i++) {
				items_array.push(response.body.items[i]);
			}
			
			res.render('index', { 
				title: 'New Items',
				data: items_array
			});
		}
		
		items_array = null;
	});
	
	hn_query = null;
}