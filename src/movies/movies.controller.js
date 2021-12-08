const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//movieExists
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

//read
function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

//list
async function list(req, res, next) {
  try {
    const showingTrue = req.query.is_showing;
    if (showingTrue === "true") {
      const dataTrue = await service.trueList();
      res.json({ data: dataTrue });
    }
    const dataStuff = await service.list();
    res.json({ data: dataStuff });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: [asyncErrorBoundary(list)],
  movieExists,
};
