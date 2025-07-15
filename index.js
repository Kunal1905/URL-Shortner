const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const { connectToMongoDB } = require("./connect");

const shortid = require("shortid");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
    id:shortId
  })
})

app.use("/", staticRoute)
app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if(!entry) return res.status(404).send("Url not found");
  res.redirect(entry.redirectURL);
});



connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo connection error:", err));

