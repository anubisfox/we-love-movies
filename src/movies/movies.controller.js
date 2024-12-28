const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

//Middleware
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movieId = movieId;
        res.locals.foundMovie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.`});
}

//Routes
async function list(req, res) {
    const isShowing = req.query.is_showing;

    if (isShowing) {
        data = await service.listMovie();
    } else {
        data = await service.list();
    }
    res.json({ data });
}

async function read(req, res) {
    const data = res.locals.foundMovie;
    res.json({ data });
}

async function listMovieTheaters(req, res) {
    const {movieId} = res.locals;
    const data = await service.listMovieTheaters(movieId);
    res.json({ data });
}

async function listMovieReviews(req, res) {
    const { movieId } = req.params;
    const data = await service.listMovieReviews(movieId);
    res.json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    listMovieTheaters: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listMovieTheaters),
    ],
    listMovieReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listMovieReviews),
    ],
}