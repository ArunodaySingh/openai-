const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const PySchema = require("./Schema/pythonSchema");

app.use(express.json());
app.use(cors());

// call the database
(() => {
  try {
    connectDB();
  } catch (err) {
    console.log(err);
  }
})();

// app.get("/", (req, res) => {
//   res.send("hey");
// });

// handle post request
app.post("/", async (req, res) => {
  const option = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    }),
  };

  try {
    const result = await fetch(
      "https://api.openai.com/v1/chat/completions",
      option
    );
    const data = await result.json();
    console.log(data);
    res.send(data.choices[0].message);
  } catch (error) {
    console.log(error);
  }
});

// Define levelhandler
app.post("/levelhandler", async (req, res) => {
  const { title, count } = req.body;
  console.table([title, count]);
  try {
    let store = await PySchema.updateOne(
      { title: title },
      { $set: { count: count } }
    );
    console.log(store);
  } catch (err) {
    console.log(err);
  }
});

app.get("/levelhandler", async (req, res) => {
  let data = await PySchema.findOne({ title: "Python" });
  res.json(data);
});

app.listen(3000, (err) => {
  if (!err) {
    console.log("Server connected");
  }
});
