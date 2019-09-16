module.exports = (_, response) => {
  const { uid, firstname, lastname } = response.locals.user;
  
  return response.json({ uid, firstname, lastname });
};
