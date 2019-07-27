require("dotenv").config();
var fs = require("fs");
var axios = require('axios');
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

switch (command) {
  case "concert-this":
    concert();
    break;

  case "spotify-this-song":
    song(input);
    break;

  case "movie-this":
    movie(input);
    break;

  case "do-what-it-says":
    verbatim();
    break;
}

function concert() {
  axios
    .get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(moment(response.data[0].datetime).format("L"));
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.region);
      console.log(response.data[0].venue.city);


    })
    .catch(function (error) {
      if (error.response) {
      }
    });
}

function song(input) {
  if (input ==="") {
      type = "track"
      input = "Ace of Base"
   }
  spotify.search({ type: "track", query: input }, function (err, data) {
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name)
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
    if (err) {
      return console.log("Error occurred:"  + err);
    }
  })
 }

// function song() {
//   var ace = function () {
//     if (input = '') {
//       type = 'track'
//       input = 'Ace of Base'
//     }
//   }

//   spotify.search({ type: 'track', query: input }, function (err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//     console.log(data.tracks.items[0].album.artists[0].name);
//     console.log(data.tracks.items[0].name)
//     console.log(data.tracks.items[0].preview_url);
//     console.log(data.tracks.items[0].album.name);

//     ace();

//   });
// }

function movie() {
    if (input ==="") {
        input = "Mr. Nobody"
     }
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
    .then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Ratings[0]);
      console.log(response.data.Ratings[1]);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);

    })
    .catch(function (error) {
      if (error.response.Search[0]) {
      }
    });
}


function verbatim() {

  // We will read the existing bank file
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.split(", ");
    input = data[1];

    song();
  });
}
