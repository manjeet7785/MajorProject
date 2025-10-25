const mongooes = require("mongoose")
const Schema = mongooes.Schema;

const listeningSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: {
      url: String,
      filename: String,
    },
    default: "https://images.unsplash.com/photo-1761165308046-174a56e73525?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    Set: (v) => v === " " ? "https://images.unsplash.com/photo-1761165308046-174a56e73525?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" : v,
  },
  price: Number,
  location: String,
  country: String,
});

const List = mongooes.model("List", listeningSchema)
module.exports = List;
