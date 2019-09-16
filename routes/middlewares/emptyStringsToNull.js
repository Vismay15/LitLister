module.exports = (request, _, next) => {
  for (var key in request.body) {
    if ('' === request.body[key]) {
      request.body[key] = null;
    }
  }
  next();
};
