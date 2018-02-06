require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request=require("request");
var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action =process.argv[2];

var userParams = process.argv;
var userSearch="";
for (var i =3; i<userParams.length; i++){
  userSearch = userSearch + " " + userParams[i];
};
console.log(userSearch);

switch (action) {
  case "my-tweets":
  tweets();
  break;

  case "spotify-this-song":
  spotifyGo();
  break;

  case "movie-this":
  movie();
  break;

  case "do-what-it-says":
  random();
  break;
}
//Twitter
function tweets (){
  var options = {screen_name: 'idaselma3025'};
  client.get('statuses/user_timeline', options, function(error, data) {
    for(var i = 0; i<data.length; i++){
      console.log(data[i].text);
    }
  })
};

//Spotify
function spotifyGo(){
  spotify.search({type:"track",query: userSearch,limit:1},function(error,data){
    if (!error && data.tracks.items[0].name) {
      for (var i = 0; i<data.tracks.items[0].artists.length; i++){
        var artistName= data.tracks.items[0].artists[i].name;
        console.log("artist_name: " + artistName);
      }//loop to capture multiple artist names
      console.log("song_name: " + data.tracks.items[0].name);
      console.log("preview_url: " + data.tracks.items[0].external_urls.spotify);
      console.log("album_name: "+ data.tracks.items[0].album.name);
    }
    else{
      spotify
      .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
      .then(function(data) {
        console.log(data.artists[0].name);
        console.log("song_name: " + data.name);
        console.log("preview_url: " + data.external_urls.spotify);
        console.log("album_name: "+ data.album.name);
      })
      .catch(function(err) {
        console.error('Error occurred: ' + err);
      });
    }
  })
}
//omdbapi
function movie(){
  request("http://www.omdbapi.com/?t="+userSearch+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && JSON.parse(body).Title) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log(JSON.parse(body));
      console.log("movie_title: "+JSON.parse(body).Title);
      console.log("release_year: "+JSON.parse(body).Year);
      console.log("IMDB_rating: "+ JSON.parse(body).imdbRating);
      console.log("tomatoes_rating: "+JSON.parse(body).Ratings[1].Value);
      console.log("production_location: "+JSON.parse(body).Country);
      console.log("movie_language: "+ JSON.parse(body).Language);
      console.log("movie_plot: "+ JSON.parse(body).Plot);
      console.log("movie_actors: "+JSON.parse(body).Actors);
    }
    else{
      request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body){
        console.log("movie_title: "+JSON.parse(body).Title);
        console.log("release_year: "+JSON.parse(body).Year);
        console.log("IMDB_rating: "+ JSON.parse(body).imdbRating);
        console.log("tomatoes_rating: "+JSON.parse(body).Ratings[1].Value);
        console.log("production_location: "+JSON.parse(body).Country);
        console.log("movie_language: "+ JSON.parse(body).Language);
        console.log("movie_plot: "+ JSON.parse(body).Plot);
        console.log("movie_actors: "+JSON.parse(body).Actors);
      });
    }
  });
}

//do what it says
function random(thingToDo){
  fs.readFile("random.txt","utf8", function(err,data){
    var string = data.split(",");
    userSearch=string[1];
    spotifyGo(userSearch);
  });
}
