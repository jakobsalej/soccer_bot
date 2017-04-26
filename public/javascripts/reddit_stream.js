/**
 * Created by jakob on 3/29/17.
 */

var Pusher = require('pusher-client');

// Open a Pusher connection to the Realtime Reddit API
var socket = new Pusher("50ed18dd967b455393ed");

// Subscribe to the /r/AskReddit subreddit (lowercase)
var subredditChannel = socket.subscribe("askreddit");

// Listen for new stories
subredditChannel.bind("new-listing", function(listing) {
    // Output listing to the browser console
    console.log(listing);
});