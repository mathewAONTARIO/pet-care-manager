// models/Pet.js
// basic pet model. keeping it light but enough for the assignment

const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    species: {
      type: String,
      required: true,
      trim: true // dog, cat, etc
    },
    breed: {
      type: String,
      trim: true
    },

    // colour so I can tell pets apart easy
    color: {
      type: String,
      trim: true
    },

    // age: value + unit so I can store 2 months, 3 weeks, etc.
    ageValue: {
      type: Number,
      min: 0
    },
    ageUnit: {
      type: String,
      enum: ['years', 'months', 'weeks'],
      default: 'years'
    },

    // gender just to keep track (male / female / unknown)
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },

    // weight so I can track growth
    weightValue: {
      type: Number,
      min: 0
    },
    weightUnit: {
      type: String,
      enum: ['kg', 'lb'],
      default: 'kg'
    },

    // health-ish stuff
    vaccinationStatus: {
      type: String,
      enum: ['fully vaccinated', 'partially vaccinated', 'not vaccinated', 'unknown'],
      default: 'unknown'
    },

    vetName: {
      type: String,
      trim: true
    },
    nextAppointment: {
      type: Date // next vet / grooming date
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // so we can see when we added/updated them
  }
);

module.exports = mongoose.model('Pet', petSchema);