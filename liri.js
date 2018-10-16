//code to read read and set any environment variables with the dotenv package
require('fs');
require("dotenv").config();
var inquirer = require("inquirer");
var Movie = require('omdb');
var request = require('request');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

// var omdb = new Movie(keys.omdb);
var omdb = process.env.OMDB_API;

//Spotify Function Call
function SpotifyAPICall() {
    spotify
    .search({ type: 'track', query: 'All the Small Things' })
    .then(function(data) {
        console.log(data.tracks.items[1]); 
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });

    };


//Movie-this Call

function MovieThisAPICall() {
    
    apikey = 'trilogy';
    searchTerm = 'remember+the+titans'
    // We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + searchTerm +"&y=&plot=short&r=json" + "&apikey="+ apikey, function(error, response, body) {

    var jsonData = JSON.parse(body);

    

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
        console.log("Title: ", jsonData.Title);
        console.log("Year Released: " + jsonData.Year);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("Country Made: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        
      
    }
  });
}


   
//Intro Console Logs
console.log('                             Welcome to Liri!\n');
console.log("");
console.log("                                  _____");
console.log("                                 |     |");
console.log("                                 | | | |");
console.log("                                 |_____|");
console.log("                           ____ ___|_|___ ____");
console.log("                          ()___)         ()___)");
console.log('\n');
console.log("In order to get started please give me one of three commands.");
console.log("Plus the term you'd like to search!")
console.log('');
console.log("spotify-this-song || movie-this || concert-this");
console.log(""); 



//ask user question of what they would like to do
inquirer.prompt([
    // Here we create a basic text prompt.
    {
        type: "input",
        message: "What command would you like to run?",
        name: "command"
    },
])
.then(function(inquirerResponse){
    console.log(inquirerResponse);
    var operator = inquirerResponse.command;
    console.log('operator: ', operator);

    //Switch case to decide what to do based on the operator specifiec
    switch(operator) {
        case "spotify-this-song":
            SpotifyAPICall();
            break;

        case "movie-this":
            MovieThisAPICall();
            break;

        case "concert-this":
            ConcertThisAPICall();
            break;
        
        default:
            console.log('Check to see your operation command was spelled correctly!');
            break;
    }       

});



