const express = require("express");
const app = express();
const users = require("./demo/user")
const post = require("./demo/posts")
const cookieParser = require("cookie-parser")
const session = require("express-session")


app.use(cookieParser("Love"));

// app.get("/signedcookies", (req, res) => {
//   res.cookie("Manjeet", "Maurya", { signed: true });
//   res.send("Send Successfully")
// })



app.get("/test/verify", (req, res) => {
  console.log("VErify");
  console.dir(req.cookies)
  res.send("Verify")
  console.log(req.signedCookies);
})


// app.get("/getcookies", (req, res) => {
//   res.cookie("Greeting", "Good Morning", "Dear");
//   res.cookie("Namaste", "Ram Ram ji")
//   res.send("Sent the cookies");
// });


// app.get("/greet", (req, res) => {
//   let { name = "anonyous" } = req.cookies;
//   res.send(`Hi ${name}`);
// })

// app.get("/", (req, res) => {
//   console.dir(req.cookies)
//   res.send("I am home")

// })

// app.use("/user", users);
// app.use("/posts", post);




// session ke liye code 

app.use(session({ secret: "My Home", resave: false, saveUninitialized: true }));

app.get("/req", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  res.send(`you sent a req ${req.session.count} time `)
})





app.get("/test", (req, res) => {
  res.send("test Successfully")
});

app.listen(3000, () => {
  console.log("Hello ji i build ");

})

