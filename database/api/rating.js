const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const updateBookRating = db => (bid, rating) => {
  var newrating = 0.0;
  var sum = db.bookrating.sum('rating', { where: { bid: bid } }).then(sum => {
    sum = sum + rating;
    var count = db.bookrating
      .count({ where: { bid: { [Op.eq]: bid } } })
      .then(count => {
        count = count + 1;
        newrating = sum / count;
        Math.round(newrating);
        db.book.update({ rating: newrating }, { where: { bid: bid } });
      });
  });
  return db.bookrating.create({ rating, bid });
};

const updateUserRating = db => (uid, rating) => {
  var newrating = 0.0;
  var sum = db.userrating.sum('rating', { where: { uid: uid } }).then(sum => {
    sum = sum + rating;
    var count = db.userrating
      .count({ where: { uid: { [Op.eq]: uid } } })
      .then(count => {
        count = count + 1;
        newrating = sum / count;
        Math.round(newrating);
        db.user.update({ rating: newrating }, { where: { uid: uid } });
      });
  });
  return db.userrating.create({ rating, uid });
};

module.exports = db => ({
  updateBookRating: updateBookRating(db),
  updateUserRating: updateUserRating(db)
});
