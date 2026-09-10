module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Server Error";
  
  const response = { message };
  if (err.code) {
    response.code = err.code;
  }
  
  res.status(status).json(response);
};
