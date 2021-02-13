// include all of your models here using CommonJS requires
const User = require("./User.js");
const Flight = require("./Flight.js");
const SavedFlight = require("./SavedFlight");
const Trip = require("./Trip.js");

module.exports = { User, Flight, SavedFlight, Trip };
