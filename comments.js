// Create web server
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");

// Use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Connect DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/itcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create schema
const CommentSchema = mongoose.Schema({
  name: String,
  message: String,
});

// Create model
const CommentModel = mongoose.model("comments", CommentSchema);

// Create route
app.get("/comments", (req, res) => {
  CommentModel.find({}, (err, data) => {
    res.json(data);
  });
});

// Create route
app.post("/comments", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  const comment = new CommentModel({
    name: name,
    message: message,
  });

  comment.save((err, data) => {
    res.json(data);
  });
});

// Create route
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;

  CommentModel.findByIdAndDelete(id, (err, data) => {
    res.json(data);
  });
});

// Create route
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;

  CommentModel.findById(id, (err, data) => {
    res.json(data);
  });
});

// Create route
app.put("/comments/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const message = req.body.message;

  CommentModel.findById(id, (err, data) => {
    data.name = name;
    data.message = message;
    data.save((err, data) => {
      res.json(data);
    });
  });
});

// Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});