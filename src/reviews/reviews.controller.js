const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//reviewExists
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

//list
async function list(req, res, next) {
    const data = await service.list(req.params.movieId);
  res.json({ data });
}

//update
async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const critic = await service.listCriticInfo(res.locals.review.critic_id);
  await service.update(updatedReview);
  const updatedReviewAgain = await service.read(updatedReview.review_id);
  const data = {
    ...updatedReviewAgain,
    critic,
  };
  res.json({ data });
}

//destroy
async function destroy(req, res, next) {
  const { review_id } = res.locals.review;
  await service.destroy(review_id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
