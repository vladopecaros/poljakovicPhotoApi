const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  photoUrl: { type: String, required: true },
  photoTitle: { type: String, required: true },
  photoCategory: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
});

const Photos = mongoose.model("Photos", photoSchema, "slike");
const mySchemas = { Photos: Photos };

module.exports = mySchemas;
