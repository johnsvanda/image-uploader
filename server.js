const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const uniqid = require("uniqid");
const PORT = process.env.PORT || 5000;

//Middleware
app.use(fileUpload());

//Upload endpoint

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.post("/upload", function(req, res) {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const files = [].concat(req.files.file);
  console.log(files.length);
  for (let file of files) {
    file.mv(`${__dirname}/images/${uniqid() + file.name.slice(-5)}`, err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200);
      }
    });
  }
});

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
