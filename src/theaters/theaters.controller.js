const service = require("./theaters.service");
const movieController = require("../movies/movies.controller");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list
async function list(req, res, next) {
  const { movieId } = req.params;
  const data = movieId
    ? await service.theatersMovieList(movieId)
    : await service.theaterList();
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
