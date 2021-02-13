const Model = require("./Model");

class Flight extends Model {
  static get tableName() {
    return "flights";
  }

  static get relationMapping() {
    const SaveFlight = require("./index.js");

    return {
      savedFlights: {
        relation: Model.HasManyRelation,
        modelClass: SaveFlight,
        join: {
          from: "flights.id",
          to: "savedFlights.flightID",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "depAirport",
        "depAirportName",
        "depCountry",
        "MinPrice",
        "Direct",
        "airlineCarriers",
        "DepartureDate",
        "arrAirport",
        "arrAirportName",
        "arrCountry",
      ],
      properties: {
        depAirport: { type: "string" },
        depAirportName: { type: "string" },
        depCountry: { type: "string" },
        MinPrice: { type: "string" },
        Direct: { type: "string" },
        airlineCarriers: { type: "string" },
        DepartureDate: { type: "string" },
        arrAirport: { type: "string" },
        arrAirportName: { type: "string" },
        arrCountry: { type: "string" },
        QuoteId: { type: "integer" },
      },
    };
  }
}

module.exports = Flight;
