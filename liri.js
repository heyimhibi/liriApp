require("dotenv").config();
const keys = require("./keys");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
let spotify = new Spotify(keys.spotify);

// ================================================================

app(process.argv[2], process.argv[3]);

// ====function definition=========================================

function app(command, parameters) {
    switch (command) {
        case "concert-this":
            getMyBand(parameters);
            break;

        case "spotify-this-song":
            getSpotifySong(parameters);
            break;

        case "movie-this":
            getMyMovie(parameters);
            break;

        // case "do-what-it-says":
        //     followCommand();
        //     break;

        default:
            console.log("Liri doesn't know that comand, please try again");
            break;
    }
};

// ====2nd function definition=========================================

function getMyBand(artist) {
    var queryURL= `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(queryURL).then(response => {
        var data = response.data;

        console.log("concert time: ",data[3].datetime);
        
        
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].venue.city + "," + (data[i].venue.region || data[i].venue.country) + " at " + data[i].venue.name + " " + moment(data[i].datetime).format("hh:mm MM/DD/YYYY")); //look in data to see if it gives time in dataset
        }

    })

}

function getSpotifySong(songName) {

    if (songName === undefined || songName === ""){
        songName = "Crystallize"
    };

    spotify.search ({
        type: "track",
        query: songName
    },

    function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
    };

    for (let i = 0; i < data.tracks.items.length; i++) {
        var song = data.tracks.items[i];
        console.log ("Number: ", i+1, "/", data.tracks.items.length);
        console.log ("Artist(s): ",  song.artists.map(getArtistNames));
        console.log("Song Name: ", song.name );
        console.log("Song Preview ", song.preview_url);
        console.log("Album Name ", song.album.name);
        console.log("===============================================================");
          
    }
})
    getArtistNames = artist => artist.name;

    // function above is equal to
    // function getArtistName (artist) {
    //     return artist.name
    // }
};
// =========================================================================================

function getMyMovie(movie) {
    if (movie === undefined || movie === "") {
        movie = "The Mummy"
    };
    var queryURL = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`; //test plot long
    axios.get(queryURL).then(response => {
        var data = response.data;
        
        console.log("Title: ", data.Title);
        console.log("Year: ", data.Year);
        console.log("Rated: ", data.Rated);
        console.log("IMDB Rating: ", data.imdbRating);
        console.log("Country: ", data.Country);
        console.log("Language: ", data.Language);
        console.log("Plot: ", data.Plot);
        console.log("Actors: ", data.Actors);
        data.Ratings.map(getRottenTomatoes);
        console.log("===========================================");
    });

    getRottenTomatoes = tomatoes =>{
        if (tomatoes.Source === "Rotten Tomatoes") {
            console.log("Rotten Tomatoes Rating: ", tomatoes.Value);
        }
    }

}

