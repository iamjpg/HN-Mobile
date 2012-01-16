// Let's create an object for fun.
MHN = {
	currentScroll : 0, // Keep track of scrolling, mmmmk?
	lockGetStory : false,
	getStory: function(url) {
		
		if (!this.lockGetStory) {
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
				// ajax. web 2.0 is so radical.
				$.ajax({
					url: '/gs?url=' + url, // Love a local proxy.
					success: function(res) {
						// Hide that loader
						$("#loader").css("display","none");
						// We gots to parse out the URL to give credit.
						var url = res.url;
						var pathArray = url.split( '/' );
						var thsHost = pathArray[2];
						// Scroll to the top for the article.
						$("body").scrollTop(0);
						// Hide the front page.
						$("#frontPage").css("display","none");
						// Animations are for show. move that sucker back to left: 0
						$('#contentContainer').css("left", 0);
						// For something so simple string concat is > jQuery template.
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
		
	},
	
	getComments : function(id) {
		this.lockGetStory = true;
		
		// Set the hash
		window.location.hash = "comments?id=" + id;
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
			// ajax. web 2.0 is so radical.
			$.ajax({
				url: '/gc?id=' + id, // Love a local proxy.
				success: function(res) {
					// Hide that loader
					$("#loader").css("display","none");
					// We gots to parse out the URL to give credit.
					var url = res.url;
					var pathArray = url.split( '/' );
					var thsHost = pathArray[2];
					// Scroll to the top for the article.
					$("body").scrollTop(0);
					// Hide the front page.
					$("#frontPage").css("display","none");
					// Animations are for show. move that sucker back to left: 0
					$('#contentContainer').css("left", 0);
					// For something so simple string concat is > jQuery template.
					var thsStr = '<div id="commentContainer">';
						$.each(res.comments, function(i,o) {
							thsStr += '<div class="comment">' + o.comment + ' -' + o.postedBy + '</div>';
							if (o.children.length > 0) {
								console.log(o);
								$.each(o.children, function(i,o) {
									thsStr += '<div class="commentChild">' + o.comment + ' -' + o.postedBy + '</div>';
									if (o.children.length > 0) {
										$.each(o.children, function(i,o) {
											thsStr += '<div class="commentSecondChild">' + o.comment + ' -' + o.postedBy + '</div>';
										});
									}
								});
							}
						});
					thsStr += '</div>';
					
					// Show the story.
					$("#story").html(thsStr);
				}
			});
		});
		
		setTimeout(function() {
			MHN.lockGetStory = false;
		}, 1000);
	},
	
	isNumeric : function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
}

// Is the DOM ready yet? Yeeeeesh.
$(document).ready(function() {
	// If the hash is not blank, get the story.
	if (window.location.hash != "") {
		// RegEx to grab the URL query param.
		var id = location.hash.replace(/^.*\=/, '');
		// Fire the method.
		if (window.location.hash.indexOf("story") > -1) {
			MHN.getStory(id);
		} else {
			MHN.getComments(id);
		}
	}
	// Window Location event listener...so, so handy...
	// I could use push state...but I'm not.
	jQuery(window.location).change(function() {
		// Is the hash blank? That means someone must have hit the back button.
		if (window.location.hash === "") {
			// Hide that loader
			$("#loader").css("display","none");
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