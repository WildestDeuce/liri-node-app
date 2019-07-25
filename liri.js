require("dotenv").config();
var fs = require("fs");
var axios = require('axios');
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv[3];

switch (command) {
  case "concert-this":
    concert();
    break;

  case "spotify-this-song":
    song();
    break;

  case "movie-this":
    movie();
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
      console.log(response.data[0].venue.name);
    })
    .catch(function (error) {
      if (error.response) {
      }
    });
}

function song() {

  spotify.search({ type: 'track', query: input }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
}

function movie() {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&s=" + input)
    .then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(response.data[0].title.year);
    })
    .catch(function (error) {
      if (error.response) {
      }
    });
}


function verbatim() {

  // We will read the existing bank file
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // Break down all the numbers inside
    data = data.split(", ");
    var result = 0;

    // Loop through those numbers and add them together to get a sum.
    for (var i = 0; i < data.length; i++) {
      if (parseFloat(data[i])) {
        result += parseFloat(data[i]);
      }
    }

    // We will then print the final balance rounded to two decimal places.
    console.log("You have a total of " + result.toFixed(2));
  });
}
