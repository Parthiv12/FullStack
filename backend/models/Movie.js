const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  overview: String,
  posterPath: String,
  backdropPath: String,
  releaseDate: Date,
  genres: [{
    id: Number,
    name: String
  }],
  runtime: Number,
  voteAverage: Number,
  voteCount: Number,
  popularity: Number,
  originalLanguage: String,
  originalTitle: String,
  productionCompanies: [{
    id: Number,
    name: String,
    logoPath: String,
    originCountry: String,
    parentCompany: Number
  }],
  cast: [{
    id: Number,
    name: String,
    character: String,
    profilePath: String,
    order: Number
  }],
  crew: [{
    id: Number,
    name: String,
    job: String,
    department: String,
    profilePath: String
  }],
  ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  }
});

// Update average rating when a new rating is added
movieSchema.methods.updateRating = function(newRating) {
  const totalRating = this.ratings.reduce((sum, r) => sum + r.rating, 0);
  this.averageRating = totalRating / this.ratings.length;
  this.ratingCount = this.ratings.length;
};

module.exports = mongoose.model('Movie', movieSchema); 