/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("savedFlights", (table) => {
    table.bigInteger("tripID").unsigned().notNullable().index().references("trips.id");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("savedFlights", (table) => {
    table.dropColumn("tripID");
  });
};
