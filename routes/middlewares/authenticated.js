module.exports = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
    next();
  } else {
    response.json(null);
  }
};
