/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("flights", (table) => {
    table.bigIncrements("id").primary();
    table.string("depAirport").notNullable();
    table.string("depAirportName").notNullable();
    table.string("QuoteId");
    table.string("depCountry").notNullable();
    table.string("MinPrice").notNullable();
    table.string("Direct").notNullable();
    table.string("airlineCarriers").notNullable();
    table.string("DepartureDate").notNullable();
    table.string("arrAirport").notNullable();
    table.string("arrAirportName").notNullable();
    table.string("arrCountry").notNullable();
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("flights");
};
