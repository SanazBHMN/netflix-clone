const express = require("express");
const movies = require("./movies.json");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("HELLO THERE");
});

app.use("/auth", require("./routes/auth"));

app.use("", require("./routes/movies"));

app.use("/sub", require("./routes/sub"));

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
