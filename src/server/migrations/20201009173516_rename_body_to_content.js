exports.up = async function (knex) {
  knex.schema.table("comment", function (table) {
    table.renameColumn("body", "content");
  });
};

exports.down = async function (knex) {
  knex.schema.table("comment", function (table) {
    table.renameColumn("content", "body");
  });
};