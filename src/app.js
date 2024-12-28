if (process.env.DATABASE_URL) require("dotenv").config();

const express = require("express");
const cors = require('cors');

const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');

const app = express();

app.use(cors()); //allows cors
app.use(express.json()); //allows JSON parse
//Routes
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);
//Errors
app.use(notFound); //No path
app.use(errorHandler); //General


module.exports = app;
