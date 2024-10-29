const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("HELLO THERE");
});

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
