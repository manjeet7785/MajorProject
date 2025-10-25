const mongoose = require("mongoose")
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const url = "mongodb+srv://admin:Raja1234%40%40@manjeet.jihoesr.mongodb.net/major";


main()
  .then(() => {
    console.log("Connected DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {

  await mongoose.connect(url);

}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data was Initialized.")

};
initDB();