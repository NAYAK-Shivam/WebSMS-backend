const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  messageSid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
