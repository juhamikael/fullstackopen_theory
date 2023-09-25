// Import dotenv
require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const testUrl = process.env.TEST_MONGODB_URI;
console.log("connecting to", testUrl);

mongoose.set("strictQuery", false);
mongoose.connect(testUrl);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

Note.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close();
});
