// place your application-wide javascripts here
MHN = {
	currentScroll : 0,
	getStory: function(url) {
		window.location.hash = "story?url=" + url;
		this.currentScroll = $("body").scrollTop();
		$('#contentContainer').animate({
			left: '-=' + $(window).width()
		}, 500, function() {
			$("#story").css("display","block");
			$("#loader").css({
				top: $("body").scrollTop(),
				width: $(window).width(),
				height: $(window).height(),
				display: "block"
			});
			$.ajax({
				url: '/gs?url=' + url,
				success: function(res) {
					$("#loader").css("display","none");
					var url = res.url;
					var pathArray = url.split( '/' );
					var thsHost = pathArray[2];
					$("body").scrollTop(0);
					$("#frontPage").css("display","none");
					$('#contentContainer').css("left", 0);
					var thsStr = '<div id="storyContents">';
						thsStr += '<h2>' + res.title + '</h2>';
						thsStr += '<div id="readThis"><em>Read the original story on <a href="' + res.url + '">' + thsHost + '</a></em></div>';
						thsStr += '<div>' + res.content + '</div>';
					thsStr += '</div>';
					$("#story").html(thsStr);
				}
			});
		});
		
	}
	/* getStory: function(url) {
		window.location = "/story?url=" + url;
	} */

}

$(document).ready(function() {
	if (window.location.hash != "") {
		var url = location.hash.replace(/^.*\=/, '');
		MHN.getStory(url);
	}
	jQuery(window.location).change(function() {
		if (window.location.hash === "") {
			$('#contentContainer').css("left", 0 - $(window).width());
			$("#story").css("display","none");
			$("#frontPage").css("display","block");
			$("body").scrollTop(MHN.currentScroll);
			$('#contentContainer').animate({
				left: '+=' + $(window).width()
			}, 500, function() {
				
			});
			
		}
	});
});