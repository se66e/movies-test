'use strict';

const mongoose = require('mongoose');
const Movie = require('../models/movie');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/movie-project', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

Movie.collection.drop();

const movies = [
  {
    title: 'Se7en',
    genre: 'Action',
    plot: 'When retiring police Detective William Somerset (Morgan Freeman) tackles a final case with the aid of newly transferred David Mills (Brad Pitt), they discover a number of elaborate and grizzly murders. They soon realize they are dealing with a serial killer (Kevin Spacey) who is targeting people he thinks represent one of the seven deadly sins. Somerset also befriends Mills'
  },
  {
    title: 'The Conjuring',
    genre: 'Horror',
    plot: `In 1970, paranormal investigators and demonologists Lorraine (Vera Farmiga) and Ed (Patrick Wilson) Warren are summoned to the home of Carolyn (Lili Taylor) and Roger (Ron Livingston) Perron. The Perrons and their five daughters have recently moved into a secluded farmhouse, where a supernatural presence has made itself known. Though the manifestations are relatively benign at first, events soon escalate in horrifying fashion, especially after the Warrens discover the house's macabre history.`
  },
  {
    title: 'Yes Man',
    genre: 'Comedy',
    plot: `Carl Allen (Jim Carrey) is stuck in a rut with his negative ways. Then he goes to a self-help seminar and learns to unleash the power of yes. Living in the affirmative leads him to all sorts of amazing and transforming experiences; he gets a job promotion, and even finds a new romance. But Carl finds that too much of anything, even positive thinking, is not necessarily a good thing.`
  }
];

Movie.create(movies)
  .then(() => {
    console.log(`Created ${movies.length} movies`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err)
  });



module.exports = Movie;