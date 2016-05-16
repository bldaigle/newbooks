
function getNewBooks(url, container) {
	var getBooks = 
		$.ajax({
	    	url: document.location.protocol + '//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D\'' + encodeURIComponent(url) + '\'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
	    	beforeSend: function() {
	      		$(container).html('<div class="loading"><img srce="https://bendaigle.ohio5.org/dev/newbooks/img/loader.gif" /></div>');
	    	},
	    	dataType: 'json',
	    	success: function(data) {
	      		$.each(data.query.results.rss.channel.item, function(key, value){
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
