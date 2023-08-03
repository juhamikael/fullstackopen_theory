// Import dotenv
require("dotenv").config();
const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://juhamikael:${password}@fullstack-open.pdme97g.mongodb.net/noteApp?retryWrites=true&w=majority`;

//   const url =
//   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  important: false,
});

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({ }).then((result) => {
  //   result.forEach((note) => {
  //     console.log(note);
  //   });
  console.log(result);
  mongoose.connection.close();
});
