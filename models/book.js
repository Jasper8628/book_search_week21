const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  selfLink: { type: String },
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  smallThumbnail: { type: String },
  description: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
