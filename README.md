# newbooks
A horizontal content slider that reads a Sierra RSS feed and returns book covers that link to their records in the library catalog.

This script will create a horizontal content slider of book covers, based on a Sierra RSS feed. Here's a working example:
https://bendaigle.ohio5.org/dev/newbooks

The slider can be embedded into any [webpage](https://github.com/bldaigle/newbooks/wiki/Add-new-books-to-any-web-page), or you could embed it into a [LibGuide](https://github.com/bldaigle/newbooks/wiki/Add-new-books-to-a-LibGuide).

This slider works off of Sierra's RSS feeds. A couple things about Sierra's feeds:

1. Feeds are based on a saved query so if you can create a list in Sierra, you can create a feed.
2. Everyone can create a saved query, but not everyone can create a feed. Just contact Ben Daigle at bldaigle@owu.edu if you'd like to create a new feed.
3. Not everything in a feed has cover art. Our covers come from Syndetics Solutions. The application passes an ISBN to Syndetics to see if there is art available. If there's no ISBN, there's no art.
