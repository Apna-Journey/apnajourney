const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  // other fields
});

module.exports = mongoose.model('Profile', profileSchema);
