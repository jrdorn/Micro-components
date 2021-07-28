const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// virtual for full name
AuthorSchema.virtual("name").get(function () {
  return `${this.family_name}, ${this.first_name}`;
});

// virtual for author lifespan
AuthorSchema.virtual("lifespan").get(function () {
  let lifeString = "";
  if (this.date_of_birth) {
    lifeString = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifeString += " - ";
  if (this.date_of_death) {
    lifeString += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifeString;
});

// virtual that returns absolute URL needed to get one instance of the model
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// export model
module.exports = mongoose.model("Author", AuthorSchema);
