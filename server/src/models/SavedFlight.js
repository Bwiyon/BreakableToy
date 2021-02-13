const Model = require("./Model");

class SavedFlight extends Model {
  static get tableName() {
    return "savedFlights";
  }

  static get relationMapping() {
    const { Flight, Trip } = require("./index.js");

    return {
      flight: {
        relation: Model.BelongsToOneRelation,
        modelClass: Flight,
        join: {
          from: "savedFlights.flightID",
          to: "flights.id",
        },
      },
      Trip: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trip,
        join: {
          from: "savedFlights.tripID",
          to: "trips.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        departure: { type: "boolean" },
        arrival: { type: "boolean" },
      },
    };
  }
}

module.exports = SavedFlight;
