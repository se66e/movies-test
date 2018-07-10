'use strict';

const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', (req, res, next) => {
  Movie.find()
    .then((movie) => {
      res.render('movies', { movie: movie });
      return;
    })
    .catch(next);
})



module.exports = router;