exports.routes = function (map) {
	map.get('/','welcome#index');
	map.get('/search/frontpage','search#frontpage');
	
	map.get('/story/contents', 'story#contents');
	map.get('/story/contents/:url', 'story#contents');
};