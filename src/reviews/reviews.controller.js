const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function isReview(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
        res.locals.reviewId = reviewId;
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
    const { reviewId } = res.locals;
    await service.destroy(reviewId);
    res.sendStatus(204);
}

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    };
    await service.update(updatedReview);
    const data = await service.criticReview(res.locals.review.review_id);
    res.json({ data });
}

module.exports = {
    update: [asyncErrorBoundary(isReview), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(isReview), asyncErrorBoundary(destroy)],
}