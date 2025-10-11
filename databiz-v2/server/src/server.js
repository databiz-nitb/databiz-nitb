const express = require("express");

const app = express();

const PORT = process.env.PORT || 5174;

//checking the health of the application
app.get("/", (req, res) => {
  res.status(200).json({ message: " The Server is Running Fine!!!" });
});

app.listen(PORT, () => {
  console.log(`App is Listening on Port ${PORT}`);
});
