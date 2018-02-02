require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// switch (action) {
//   case "my-tweets":
//     tweets();
//     break;
//
//   case "spotify-this-song":
//     spotify();
//     break;
//
//   case "movie-this":
//     movie();
//     break;
//
//   case "do-what-it-says":
//     random();
//     break;
// }
var options = {screen_name: 'idaselma3025'};
client.get('statuses/user_timeline', options, function(error, data) {
  for(var i = 0; i<data.length; i++){
    console.log(data[i].text);
  }
});
// client.stream('statuses/filter', {track: 'twitter'},  function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//   });
//
//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });
