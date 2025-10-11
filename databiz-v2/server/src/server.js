const app = require("./app");

const PORT = process.env.PORT || 4000;

//checking health
app.get("/api/health", (req, res) => {
  res.status(200).send({ message: "The Sever Health is Fine" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
