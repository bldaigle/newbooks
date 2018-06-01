// This script originally used the YQL Console as a service to convert the RSS response from XML to JSON so that it could be parsed. 
// On August 24, 2017, though, this service ceased to become reliable. It was returning HTTP 400 errors. Luckily, a new API from the
// site rss2json is available so the script below was updated to point to that API. See https://rss2json.com/docs for documentation.

function getNewBooks(feedURL, container) {
	var getBooks = 
		$.ajax({
	    	url: 'https://api.rss2json.com/v1/api.json',
	    	method: 'GET',
	    	dataType: 'json',
	    	data: {
	    		rss_url: feedURL,
	    		api_key: 'ENTER API KEY FROM RSS2JSON',
	    		count: 100
	    	}
	    }).done(function (response) {
	    	if(response.status != 'ok') { throw response.message; }

	    	console.log('====== ' + response.feed.title + ' ======');

	    	$.each(response.items, function (key, value) {
	    		$('.lSSlideOuter a').attr('target','_blank');
	      		var bookTitle = value.title; // Get the title of the book
	      		var shortTitle = $.trim(bookTitle).substring(0,75) + '...'; // Create a snippet from the title to display over default cover art image when no cover art is available.
	      		var cover = value.thumbnail; // Get the cover art image
	      		var catalogLink = value.link; // Get the catalog link
	      		var defaultCover = '<img src="https://bendaigle.ohio5.org/dev/newbooks/img/book-icon.png" alt="' + bookTitle + '" />'; // Establish a default cover image to use when no art is avialable.
	      		if (cover.length > 0) { // If there is cover art available, the use it and provide a link to the catalog record.
	      			var thehtml = '<div class="coverArt"><a href="' + catalogLink + '"><img src="' + cover + '" alt="' + bookTitle + '" /></a></div>'
	      		} else { // If there is no cover art available, display a default cover image, a short title snippet, and link both to the catalog record.
	      			var thehtml = '<div class="coverArt"><a href="' + catalogLink + '">' + defaultCover + '</a><div class="bookTitle"><a href="' + catalogLink + '">' + shortTitle + '</a></div></div>'
	      		}
	      		$(container).append(thehtml); // Move the HTML above into the #newbooks div
	      	});
	    });

	getBooks.done(function(){
		$(container).lightSlider({
			pager: false,
		});
	});
};
