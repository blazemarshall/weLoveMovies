
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//critic object
const critical = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

//read
function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ "reviews.review_id": review_id })
    .first();
}

//list
function list(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ movie_id })
    .then((spam) => spam.map(critical));
}

//update
function update(updatedReview) {
  return knex("reviews")
      .update(updatedReview, "*")
      .where({ review_id: updatedReview.review_id })
}

//criticInfo
function listCriticInfo(critic_id) {
  return knex("critics as c").select("*").where({ critic_id }).first();
}

//destroy
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  destroy,
  update,
  listCriticInfo,
};
