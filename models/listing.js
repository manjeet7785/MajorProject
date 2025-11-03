const mongooes = require("mongoose");
const reviews = require("./reviews");
const Schema = mongooes.Schema;

const listeningSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});


listeningSchema.post("findOneAndDelete", async (show) => {
  if (show) {
    await reviews.deleteMany({ _id: { $in: show.reviews } })
  }

})
// db.users.dropIndex('username_1')
const List = mongooes.model("List", listeningSchema)
module.exports = List;

