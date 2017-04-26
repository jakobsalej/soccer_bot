var request = require('request');
var cron = require('node-cron');

var url = 'https://www.reddit.com/r/soccer/new.json';

// set user agent (required by reddit api)
var options = {
  url: url,
  headers: {
    'User-Agent': 'soccer-bot'
  }
};


cron.schedule('*/1 * * * *', function(){
  console.log('running a task every minute\n\n');
  
  // make a request
  request(options, function (error, response, body) {
    console.log('error:', error);   // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);  // Print the response status code if a response was received

    var data = JSON.parse(body);
    //console.log(data.data.children);

    for (child in data.data.children) {
      var post_title = data.data.children[child].data.title;
      console.log(post_title);
    }
  });
});


