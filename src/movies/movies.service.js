const knex = require("../db/connection");

//list
function list() {
  return knex("movies").select("*");
}

//is_showing = true
function trueList() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct()
    .select("m.*")
    .where({ "mt.is_showing": true });
}

//read
function read(movie_id) {
  return knex("movies as m")
    .select("*")
    .where({ "m.movie_id": movie_id })
    .first();
}

module.exports = {
  list,
  trueList,
  read,
};
