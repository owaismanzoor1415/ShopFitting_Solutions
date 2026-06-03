const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

  title: String,

  slug: String,

  tagline: String,

  shortDescription: String,

  longDescription: String,

}, {
  timestamps: true,
});

module.exports = mongoose.model("Service", serviceSchema);