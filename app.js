const express = require("express");
const app = express();
const mongoose = require("mongoose");
const List = require("./models/listing.js")
const path = require("path")
const methodOver = require("method-override")
const ejsmate = require("ejs-mate")

const url = "mongodb+srv://admin:Raja1234%40%40@manjeet.jihoesr.mongodb.net/major";

async function main() {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connection successful!");

    app.listen(8080, () => {
      console.log("Server is listening to port 8080");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOver("_method"));
app.engine("ejs", ejsmate)
app.use(express.static(path.join(__dirname, "/public")))

app.get("/", (req, res) => {
  res.send("Hii I am")
});

//index Route
app.get("/listing", async (req, res) => {
  const Alllist = await List.find({});   //List ko pass kiya hun  models ke listings se 

  res.render("listings/index", { Alllist });

})

//show Route
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const show = await List.findById(id);    //List ko pass kiya hun  models ke listings se
  res.render("listings/show", { show });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new")
})

//Create Route
app.post("/listings", (req, res) => {
  let create = req.body.listing;
  // console.log(create);

  // ab window me add krne ke liye list 
  const imageUrl = create.image;
  create.image = {
    url: imageUrl,
    filename: 'placeholder-filename' // Provide a temporary filename
  };
  const newList = new List(req.body.listing);
  newList.save();
  res.redirect("/listing")  //isse list ko add kiya hun list me 
  // console.log();
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await List.findById(id);
  res.render("listings/edit", { listing });
})

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;

  // 1. Get the data from the form
  let updatedListing = req.body.listing;

  // 2. Re-structure the image field to match the Schema (object with url and filename)
  // The form only sends the URL string, so we need to convert it.
  if (updatedListing.image) {
    updatedListing.image = {
      url: updatedListing.image,
      filename: 'placeholder-filename' // Use a temporary/placeholder filename
    };
  }

  // 3. Perform the update
  await List.findByIdAndUpdate(id, updatedListing);

  res.redirect(`/listing/${id}`);
})

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteList = await List.findByIdAndDelete(id)
  res.redirect("/listing")
  console.log(deleteList);

})

// app.get("/listening", async (req, res) => {
//   let sample = new List({
//     title: "My New Home",
//     description: "My the nae",
//     price: 12000,
//     location: "Lucknow",
//     country: "India"
//   })
//   await sample.save();
//   console.log("Saple wala ");
//   res.send("Successfully")

// })

main(); 