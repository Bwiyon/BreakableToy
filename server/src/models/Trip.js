const Model = require("./Model");

class Trip extends Model {
  static get tableName() {
    return "trips";
  }

  static get relationMapping() {
    const { User, SavedFlight } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "trips.userID",
          to: "users.id",
        },
      },
      savedFlights: {
        relation: Model.HasManyRelation,
        modelClass: SavedFlight,
        join: {
          from: "trips.id",
          to: "savedFlights.tripID",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    };
  }
}

module.exports = Trip;
