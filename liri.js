//code to read read and set any environment variables with the dotenv package
const fs = require('fs');
var dotenv = require("dotenv").config();
var Spotify = require('node-spotify-api');

 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
// var spotify = new Spotify(keys.spotify);


spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });



//code required 



console.log('Welcome to Liri! How Can I help you today?\n');
console.log('\n');
console.log('In order to get started please give me one of three commands: \n');
console.log('spotify-this-song || movie-this || concert-this');
console.log('To learn about what each one does put the word "help" after the choice you made.') 