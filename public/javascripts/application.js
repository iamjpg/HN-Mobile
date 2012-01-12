// place your application-wide javascripts here
MHN = {
	/* getStory: function(url) {
		$('#contentContainer').animate({
			left: '-=' + $(window).width()
		}, 1000, function() {

			// Animation complete. CALLBACK?
			window.location = "/story/contents?url=" + url;
		});
		
	} */
	getStory: function(url) {
		window.location = "/story?url=" + url;
	}

}