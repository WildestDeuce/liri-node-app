require("dotenv").config();
var fs = require("fs");
var axios = require('axios');
var moment = require("moment");
var Spotify = require ("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);