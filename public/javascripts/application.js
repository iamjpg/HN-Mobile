// Let's create an object for fun.
MHN = {
	currentScroll : 0, // Keep track of scrolling, mmmmk?
	getStory: function(url) {
		// Set the hash
		window.location.hash = "story?url=" + url;
		// Set users current scroll pos
		this.currentScroll = $("body").scrollTop();
		// Animations are fun. Who needs a mobile framework?
		$('#contentContainer').animate({
			left: '-=' + $(window).width()
		}, 500, function() { // Half a second seems right.
			// Since we're gonna print the story to the screen, let's show the div.
			$("#story").css("display","block");
			// While we wait for data to return, a loader is nice for the user, right?
			$("#loader").css({
				top: $("body").scrollTop(),
				width: $(window).width(),
				height: $(window).height(),
				display: "block"
			});
			// AJAX!!!! SO WEB 5.7
			$.ajax({
				url: '/gs?url=' + url, // Love a local proxy.
				success: function(res) {
					// Hide that loader
					$("#loader").css("display","none");
					// We gots to parse out the URL for credit
					// for the link to the actual article
					var url = res.url;
					var pathArray = url.split( '/' );
					var thsHost = pathArray[2];
					// Scroll to the top for the article.
					$("body").scrollTop(0);
					//Hide the front page because...
					$("#frontPage").css("display","none");
					// ... animations are for show. move that sucker back to left: 0
					$('#contentContainer').css("left", 0);
					// Ya ya, I should use a jQuery template...whatever...
					// ...simple string concat is faster.
					var thsStr = '<div id="storyContents">';
						thsStr += '<h2>' + res.title + '</h2>';
						thsStr += '<div id="readThis"><em>Read the original story on <a href="' + res.url + '">' + thsHost + '</a></em></div>';
						thsStr += '<div>' + res.content + '</div>';
					thsStr += '</div>';
					// Show the story.
					$("#story").html(thsStr);
				}
			});
		});
		
	}
}

// Is the DOM ready yet? Yeeeeesh.
$(document).ready(function() {
	// If the hash is not blank, get the story.
	if (window.location.hash != "") {
		var url = location.hash.replace(/^.*\=/, '');
		MHN.getStory(url);
	}
	// Window Location event listener...so, so handy...
	// I could use push state...but I'm not.
	jQuery(window.location).change(function() {
		// Is the hash blank? That means someone must have hit the back button.
		if (window.location.hash === "") {
			// Position the content div off the screen.
			$('#contentContainer').css("left", 0 - $(window).width());
			// Hide the story div
			$("#story").css("display","none");
			// Show front page div.
			$("#frontPage").css("display","block");
			// Set the proper scroll for the user.
			$("body").scrollTop(MHN.currentScroll);
			// And animate the front page back in.  Woot.
			$('#contentContainer').animate({
				left: '+=' + $(window).width()
			}, 500, function() {
				
			});
			
		}
	});
});