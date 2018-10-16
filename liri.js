//code to read read and set any environment variables with the dotenv package
var fs = require('fs');
require("dotenv").config();
var inquirer = require("inquirer");
var moment = require("moment");
// var bandsintown = require('bandsintown')('9d6aabfeb9d1cdc49934d129dae9bfef');
var Movie = require('omdb');
var request = require('request');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

// var omdb = new Movie(keys.omdb);
var omdb = process.env.OMDB_API;


//Functions
//Spotify Artist Name Retrieval
var getArtistNames = function(artist) {
    return JSON.stringify(artist.name);
}


//SPOTIFY Function Call
function SpotifyAPICall(searchTerm) {
    spotify
    .search({ type: 'track', query: searchTerm })
    .then(function(data) {
        //Starting border for music
        console.log('\n');
        console.log('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰');
        var songs = data.tracks.items;
        for (var i=0; i<songs.length; i++){
            
            console.log(i+1);
            console.log('Artist(s): ', songs[i].artists.map(getArtistNames).join(", "));
            console.log('Song name: ', songs[i].name);
            console.log('Preview song: ', songs[i].preview_url);
            console.log('Album: ', songs[i].album.name);
            console.log('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰');
        }
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });

    };


//OBMD Call
function MovieThisAPICall(searchTerm) {
    
    apikey = 'trilogy';
    
// API URL request call for OMDB
request("http://www.omdbapi.com/?t=" + searchTerm +"&y=&plot=short&r=json" + "&apikey="+ apikey, function(error, response, body) {

    var jsonData = JSON.parse(body);

    

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        console.log('\n');
        console.log("»»————-　★　————-««");
        console.log("Title: ", jsonData.Title);
        console.log("Year Released: " + jsonData.Year);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("Country Made: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("»»————-　★　————-««");
              
    };
  });
};

//BANDS-IN-TOWN call function
function ConcertThisAPICall(searchTerm) {

    apikey = '9d6aabfeb9d1cdc49934d129dae9bfef';
    
// API URL request call for OMDB
request("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=" + apikey + "&date=upcoming", function(error, response, body) {

    var events = JSON.parse(body);

    
    
    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        console.log('\n');
        console.log('Events for: ', searchTerm);
        console.log("⊱ ────── {⋅. ♪ .⋅} ────── ⊰");
        // console.log("Bands in town data: ", events);
        
        for (var i=0; i< events.length; i++){
            
            console.log(i+1);
            console.log('Name of Venue: ', events[i].venue.name);
            console.log('Location: ' + events[i].venue.city + ', ' + events[i].venue.country);
            console.log('Date of Event: ', events[i].datetime);
            console.log('');
            console.log("⊱ ────── {⋅. ♪ .⋅} ────── ⊰");
                      
    };
  };
});
};

//DO-WHAT-IT-SAYS
function RandomRead() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      });
};

function decideFunc(operator, searchTerm) {
    switch(operator) {
        case "spotify-this-song":
            // followUpQ(searchTerm); sample insertion
            SpotifyAPICall(searchTerm);
            break;

        case "movie-this":
            MovieThisAPICall(searchTerm);
            break;

        case "concert-this":
            ConcertThisAPICall(searchTerm);
            break;

        case "do-what-it-says":
            RandomRead();
            break;
        
        default:
            console.log('Check to see your operation command was spelled correctly!');
            break;
    };      
};

function initialQs() {
//ask user question of what they would like to do
inquirer.prompt([
    // Here we create a list of choices
    {
        type: "list",
        message: "What command would you like to run?",
        choices: ['spotify-this-song', 'movie-this', 'concert-this', 'do-what-it-says'],
        name: "command"
    },
    //here we ask what search item they would like to combine with the operating command
    {
        type: "input",
        message: "What would you like to search for?",
        name: "input"
    },
])
.then(function(inquirerResponse){
    console.log(inquirerResponse);
    var operator = inquirerResponse.command;
    var searchTerm = inquirerResponse.input;
    

    //Switch case to decide what to do based on the operator specifiec
    decideFunc(operator, searchTerm);

});
};
//sample follow up question code
// function followUpQ(searchTerm){
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "What would you like to search for?",
//             name: "input2"
//         },
//     ])
//     .then(function(inquirerResponse){
//     searchTerm = inquirerResponse.input2;
// });
//     return searchTerm;
// };


   
//Intro console Logs
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
console.log("spotify-this-song || movie-this || concert-this || do-what-it-says");
console.log(""); 



initialQs();



