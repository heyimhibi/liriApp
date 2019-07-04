require("dotenv").config();
// const keys = require("./keys");
// const Spotify = require("node-spotify-api");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
// let spotify = new Spotify(keys.spotify);

// ================================================================

app(process.argv[2], process.argv[3]);

// ====function definition=========================================

function app(command, parameters) {
    switch (command) {
        case "concert-this":
            getMyBand(parameters);
            break;

        // case "spotify-this-song":
        //     getSpotifySong(parameters);
        //     break;

        // case "movie-this":
        //     getMyMovie(parameters);
        //     break;

        // case "do-what-it-says":
        //     followCommand();
        //     break;

        default:
            console.log("Liri doesn't know that comand, please try again");
            break;
    }
}

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