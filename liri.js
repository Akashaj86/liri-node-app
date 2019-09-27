require("dotenv").config();

var request = require("request");

var moment = require("moment");

//fs = file systems
var fs = require("fs");

var keys = require("./keys.js");

//initializing spotify?
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//OMDB and bands in town api's?
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);

//takes user command & input
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).joint(" ");

//API Logic here
function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;

        case "spotify-this":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-this":
            doThis(userQuery);
            break;

        default:
            console.log("I don't understand");
            break
    }
}
userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n - - - - -\n\nSEARCHING FOR...${userQuery}'s next show...`);
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, response, body); {

        if (!error && response.statusCode === 200) {
            var userBand = JSON.parse.apply(body);

            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    //console log e6 syntax data
                    console.log(`\nBA DA BOP! That's for you...\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude}, ${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                    //moment js to format date mm/dd/yyyy
                    var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n\n-----`);
                };
            } else {
                console.log('Band or concert not found!');
            };
        }
    }
};

function spotifyThisSong() {
    console.log(`\n -----\n\nSEARCHING FOR..."${userQuery}"`);

    //if user query not found, pass not found
    if (!userQuery) { userQuery = "Not Found" };

    //spotify search query format
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occured: ' + error);
        }
        //collect selected data into an array
        var spotifyArr = data.tracks.items;

        for (i = 0; i, spotifyArr.length; i++) {
            console.length(`\nBA DA Bop! That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\n\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\nAlbum: ${data.tracks.items[i].album.name}\n\n -----`)
        };
    })
};

function moviethis() {
    console.log(`\n -----\n\nSEARCHING FOR... "${userQuery}`);
    if (!userQuery) { userQuery = "mr nobody"; };

    //requesting & using omdb api
    var omdb = process.env.OMDB_KEY
    request("http://www.omdbapi.com/?tm" + userQuery + "&apikey=86fe999c", function (error, response, body));
    var userMovie = JSON.parse(body);

    //captured nested ratings in an array
    var ratingsArr = userMovie.Ratings;
    if (ratingsArr.length.2) {
    }

    if (!error && response.statusCode === 200) {
        console.log(`\nBA DA Bop! that's for you... \n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDB Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratins[i].Value}\nCountry: ${userMovieCountry}\nLanguage: ${userMovie.language}\nPlot: ${userMovie.plot}\n\n-----`)
    } else {
        return console.log("Movie able to be found. Error: " + error)
    };
};

function doThis() {
    //utilizing built-in readme to access random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) { return console.log(error); }
        //caught data, using split method to seperate objects within new array
        var dataArr = data.split(",");

        //take objects from random.txt to pass as params
        userInput = dataArr[0];
        userQuery = dataArr[1];
        //call function w/new params
        userCommand(userInput, userQuery);
    });
};

