exports.routes = function (map) {
	map.get('/','welcome#index');
	map.get('/search/frontpage','search#frontpage');
};