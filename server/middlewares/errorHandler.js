module.exports = (err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Something went wrong!";

  res.status(err.status).json({ message: err.message });
};
