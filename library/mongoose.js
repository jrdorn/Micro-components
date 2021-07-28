// import mongoose module
const mongoose = require("mongoose");

// default mongoose connection
const mongoDB = "000";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// default connection
const db = mongoose.connection;

// get notified of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error: "));

// define a schema
let Schema = mongoose.Schema;

let ModelSchema = new Schema({
  string: String,
  date: Date,
});

// compile model from schema
let Model = mongoose.model("Model", ModelSchema);
