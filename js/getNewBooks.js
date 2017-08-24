// This script originally used the YQL Console as a service to convert the RSS response from XML to JSON so that it could be parsed. 
// On August 24, 2017, though, this service ceased to become reliable. It was returning HTTP 400 errors. Luckily, a new API from the
// site rss2json is available so the script below was updated to point to that API. See https://rss2json.com/docs for documentation.

function getNewBooks(url, container) {
	var getBooks = 
		$.ajax({
	    	url: document.location.protocol + '//api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url),
	    	beforeSend: function() {
	      		$(container).html('<div class="loading"><img srce="https://bendaigle.ohio5.org/dev/newbooks/img/loader.gif" /></div>');
	    	},
	    	dataType: 'json',
	    	success: function(data) {
	      		$.each(data.items, function(key, value){
	      			var covers = value.description;
	      			$('.lSSlideOuter a').attr('target','_blank');
	      			var catalogLink = value.link;
	      			var bookTitle = value.title;
	      			var shortTitle = $.trim(bookTitle).substring(0, 75) + '...';
	      			var defaultCover = '<img src="https://bendaigle.ohio5.org/dev/newbooks/img/book-icon.png" />'
	      			var thehtml = '<div class="coverArt"><a href='+catalogLink+'>'+defaultCover+'</a><div class="bookTitle"><a href="'+catalogLink+'">'+shortTitle+'</a></div>'+covers+'</div>';
	        		$(container).append(thehtml);
	      		});
	    	},
	    	error: function() {
	      		$(container).html('<p>Oops! Try that again in a few moments.</p>');
	    	}
	  	});

	getBooks.done(function(){
		$(container).lightSlider({
			pager: false,
		});
	});

	
};
