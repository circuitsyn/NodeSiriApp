//code to read read and set any environment variables with the dotenv package
require('fs');
require("dotenv").config();
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var operator = process.argv[2];

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
console.log("");
console.log("In order to get started please give me one of three commands:");
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

switch(operator) {
    case "spotify-this-song":
        SpotifyAPICall();
        break;
    }

});



