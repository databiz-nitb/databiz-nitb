module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Server Error";
  res.status(status).json({ message });
};
