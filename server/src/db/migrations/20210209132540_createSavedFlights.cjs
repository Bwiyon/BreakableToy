/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("savedFlights", (table) => {
    table.bigIncrements("id").primary();
    table.bigInteger("flightID").unsigned().notNullable().index().references("flights.id");
    table.boolean("departure");
    table.boolean("arrival");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("savedFlights");
};
