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
var checkState = false;

// var omdb = new Movie(keys.omdb);
var omdb = process.env.OMDB_API;


//------------------------------------Functions------------------------------------

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ File Write ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function  writeData(data) {
    fs.appendFile("log.txt", data, function(err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
          return console.log(err);
        }
      
        // Otherwise, it will print: "movies.txt was updated!"
        // console.log("log.txt was updated!");
      
      });


};

//~~~~~~~~~~~~~~~~~~~~~~~~~~ SPOTIFY Artist Name Retrieval ~~~~~~~~~~~~~~~~~~~~~~~~
var getArtistNames = function(artist) {
    return JSON.stringify(artist.name);
}


//SPOTIFY Function Call
function SpotifyAPICall(checkState) {
    
    if (checkState == false) {
    //follow up question to ask for search term
    inquirer.prompt([
        {
            type: "input",
            message: "What audio track would you like to search for?",
            name: "input"
        },
    ])
    .then(function(inquirerResponse){
    searchTerm = inquirerResponse.input;
    
    //Default if blank is inputted
    if (searchTerm == ""){
        searchTerm = "The Sign";
    };

    //spotify api call
    spotify
    .search({ type: 'track', query: searchTerm })
    .then(function(data) {
        //Starting border for music
        console.log('\n');
        writeData('\n');
        console.log('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰');
        writeData('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\r\n');

        var songs = data.tracks.items;
        for (var i=0; i<songs.length; i++){
            
            count = i+1;
            console.log(count);
            writeData(count +'\r\n');

            artist = ('Artist(s): ', songs[i].artists.map(getArtistNames).join(", "));
            console.log(artist);
            writeData(artist +'\r\n');
            
            song = ('Song name: ', songs[i].name);
            console.log(song);
            writeData(song +'\r\n');

            previewURL = ('Preview song: ', songs[i].preview_url);
            console.log(previewURL);
            writeData(previewURL + '\r\n');

            album = ('Album: ', songs[i].album.name);
            console.log(album);
            writeData(album + '\r\n')

            console.log('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰');
            writeData('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\r\n');
        }
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });
    });
    
    }

    else if (checkState == true) {
        //spotify api call
    spotify
    .search({ type: 'track', query: searchTerm })
    .then(function(data) {
        checkState = false;
        //Starting border for music

        console.log('\n');
        writeData('\n');
        console.log('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰');
        writeData('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\r\n');

        var songs = data.tracks.items;
        for (var i=0; i<songs.length; i++){
            
            count = i+1;
            console.log(count);
            writeData(count +'\r\n');

            artist = ('Artist(s): ', songs[i].artists.map(getArtistNames).join(", "));
            console.log(artist);
            writeData(artist +'\r\n');
            
            song = ('Song name: ', songs[i].name);
            console.log(song);
            writeData(song +'\r\n');

            previewURL = ('Preview song: ', songs[i].preview_url);
            console.log(previewURL);
            writeData(previewURL + '\r\n');

            album = ('Album: ', songs[i].album.name);
            console.log(album);
            writeData(album + '\r\n')

            console.log('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰');
            writeData('⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\r\n');
        }
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });

    };
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SPOTIFY End ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ OBMD Call ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function MovieThisAPICall(checkState) {
   
    if (checkState == false) {
    //follow up question for search term
    inquirer.prompt([
        {
            type: "input",
            message: "What movie would you like to search for?",
            name: "input"
        },
    ])
    .then(function(inquirerResponse){
    searchTerm = inquirerResponse.input;
    
    //Default if blank is inputted
    if (searchTerm == ""){
        searchTerm = "Mr. Nobody";
    };

    apikey = 'trilogy';
    
    // API URL request call for OMDB
    request("http://www.omdbapi.com/?t=" + searchTerm +"&y=&plot=short&r=json" + "&apikey="+ apikey, function(error, response, body) {

    var jsonData = JSON.parse(body);

    

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        indent = ('\n');
        console.log(indent);
        writeData(indent +'\r\n');
        
        bar = ("»»————-　★　————-««");
        console.log(bar);
        writeData(bar +'\r\n');

        time =(('Time logged: ') + (moment().format("MM-DD-YYYY hh:mma")));
        console.log(time);
        writeData(time +'\r\n');

        title = ("Title: ", jsonData.Title);
        console.log(title);
        writeData(title +'\r\n');

        yrReleased = ("Year Released: " + jsonData.Year);
        console.log(yrReleased);
        writeData(yrReleased +'\r\n');

        IMDBRating = ("IMDB Rating: " + jsonData.imdbRating);
        console.log(IMDBRating);
        writeData(IMDBRating +'\r\n');

        RT = ("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log(RT);
        writeData(RT +'\r\n');

        country = ("Country Made: " + jsonData.Country);
        console.log(country);
        writeData(country +'\r\n');

        lang = ("Language: " + jsonData.Language);
        console.log(lang);
        writeData(lang +'\r\n');

        plot = ("Plot: " + jsonData.Plot);
        console.log(plot);
        writeData(plot +'\r\n');

        actors = ("Actors: " + jsonData.Actors);
        console.log(actors);
        writeData(actors +'\r\n');

        console.log(bar);
        writeData(bar +'\r\n');

    };
  });
});
}

else if (checkState == true){

    apikey = 'trilogy';
    checkState = false;
    // API URL request call for OMDB
    request("http://www.omdbapi.com/?t=" + searchTerm +"&y=&plot=short&r=json" + "&apikey="+ apikey, function(error, response, body) {

    var jsonData = JSON.parse(body);

    

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        indent = ('\n');
        console.log(indent);
        writeData(indent +'\r\n');
        
        bar = ("»»————-　★　————-««");
        console.log(bar);
        writeData(bar +'\r\n');

        time =(('Time logged: ') + (moment().format("MM-DD-YYYY hh:mma")));
        console.log(time);
        writeData(time +'\r\n');

        title = ("Title: ", jsonData.Title);
        console.log(title);
        writeData(title +'\r\n');

        yrReleased = ("Year Released: " + jsonData.Year);
        console.log(yrReleased);
        writeData(yrReleased +'\r\n');

        IMDBRating = ("IMDB Rating: " + jsonData.imdbRating);
        console.log(IMDBRating);
        writeData(IMDBRating +'\r\n');

        RT = ("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log(RT);
        writeData(RT +'\r\n');

        country = ("Country Made: " + jsonData.Country);
        console.log(country);
        writeData(country +'\r\n');

        lang = ("Language: " + jsonData.Language);
        console.log(lang);
        writeData(lang +'\r\n');

        plot = ("Plot: " + jsonData.Plot);
        console.log(plot);
        writeData(plot +'\r\n');

        actors = ("Actors: " + jsonData.Actors);
        console.log(actors);
        writeData(actors +'\r\n');

        console.log(bar);
        writeData(bar +'\r\n');
    };
});

};
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ OBMD END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BANDS-IN-TOWN call function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function ConcertThisAPICall(checkState) {
    
    if (checkState == false) {
    //follow up Question for search term
    inquirer.prompt([
        {
            type: "input",
            message: "What concert artist would you like to search for?",
            name: "input"
        },
    ])
    .then(function(inquirerResponse){
    searchTerm = inquirerResponse.input;
    
    //Default if blank is inputted
    if (searchTerm == ""){
        searchTerm = "Shinedown";
    };


    //Bands-In-Town API Call
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
            console.log('Location: ' + events[i].venue.city + ', ' + events[i].venue.country);console.log('Date of Event: ', moment(events[i].datetime).format("MM-DD-YYYY"));
            console.log('Time: ', moment(events[i].datetime).format("hh:mm a"))
            console.log('');
            console.log("⊱ ────── {⋅. ♪ .⋅} ────── ⊰");
                      
    };
  };
});
});
}
    else if (checkState = true) {

        //OMDB API Call
        apikey = '9d6aabfeb9d1cdc49934d129dae9bfef';
        checkState = false;
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
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BANDS-IN-TOWN END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DO-WHAT-IT-SAYS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
        operator = dataArr[0];
        searchTerm = dataArr[1];
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        decideFunc(operator, searchTerm, checkState);
        // return ();
        
      });
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DO-WHAT-IT-SAYS end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Decide Function (logic flow) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Function to help decide what to do with the operator input
function decideFunc(operator) {
    switch(operator) {
        case "spotify-this-song":
            SpotifyAPICall(checkState);
            break;

        case "movie-this":
            MovieThisAPICall(checkState);
            break;

        case "concert-this":
            ConcertThisAPICall(checkState);
            break;

        case "do-what-it-says":
            checkState = true;
            RandomRead(checkState);
            break;
        
        default:
            console.log('Check to see your operation command was spelled correctly!');
            break;
    };      
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Decide Function End ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//Function to kick off the questions ater initial greeting
function initialQ() {
//ask user question of what they would like to do
inquirer.prompt([
    // Here we create a list of choices
    {
        type: "list",
        message: "What command would you like to run?",
        choices: ['spotify-this-song', 'movie-this', 'concert-this', 'do-what-it-says'],
        name: "command"
    },
    
])
.then(function(inquirerResponse){
    
    var operator = inquirerResponse.command;
    // var searchTerm = inquirerResponse.input;
    

    //Switch case to decide what to do based on the operator specifiec
    decideFunc(operator);

});
};

//--------------------------------------Intro console Logs--------------------------------
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
//-------------------------------------------- Intro End ---------------------------------

//------------------------------------------- Program Start ------------------------------

initialQ();



