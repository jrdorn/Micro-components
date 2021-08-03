const { DateTime } = require("luxon");

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

// virtual for DOB formatting
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

// virtual for DOD formatting
AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

// virtual lifespan
AuthorSchema.virtual("lifespan").get(function () {
  if (this.date_of_birth && this.date_of_death) {
    let birth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
    let death = DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
    return `${birth} - ${death}`;
  } else {
    return "";
  }
});

// virtual that returns absolute URL needed to get one instance of the model
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// export model
module.exports = mongoose.model("Author", AuthorSchema);
