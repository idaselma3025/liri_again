# LIRI . . . SIRI's Cousin?
This is a great little node JS app that allows the user to enter actions followed by search terms to quickly access several popular APIs.  The accessible APIs are Twitter, Spotify and OMDB.  Read on about searching with each API and returned data.

#Twitter search
The Twitter API was accessed by installing the Twitter npm (https://www.npmjs.com/package/twitter).
To access the Twitter search enter "node liri.js" + "my-tweets" + RETURN.
The console will display my last 20 tweets.

#Spotify search
The Spotify API was accessed by installing the Spotify npm (https://www.npmjs.com/package/node-spotify-api).
To access the Spotify search enter "node liri.js" + "spotify-this-song" + "Song of your choice" + RETURN.
The console will display the artist_name, song_name, preview_url and the album_name associated with the song you searched.

#OMDB search
The OMDB API was accessed by installing the request npm (https://www.npmjs.com/package/request).
To access the OMDB search enter "node liri.js" + "movie-this" + "movie title of your choice" + RETURN.
The console will display any rating information available, movie_title, release_year, production_location, movie_language, movie_plot and movie_actors.
