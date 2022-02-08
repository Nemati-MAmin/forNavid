const mongoose = require('mongoose');

const User = new Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  });
  
  exports.User = mongoose.model('User', User);
