const getBookData = db => bid => db.book.findByPk(bid);

const addBook = db => (title, author, isbn, description, pictureurl, type) =>
  db.book.create({
    title,
    author,
    isbn,
    description,
    pictureurl,
    type
  });

//Recomendations for carousel returns 5 books from the database
const getLatestReleases = db => () => {
  return db.book.findAll({ limit: 10, order: [['bid', 'DESC']] });
};

const getBookListings = db => bid =>
  db.book.findByPk(bid, {
    include: [
      {
        model: db.listing,
        as: 'Listings',
        include: [
          {
            model: db.user,
            as: 'Seller',
            attributes: ['uid', 'firstname', 'lastname']
          }
        ]
      }
    ]
  });

module.exports = db => ({
  getBookData: getBookData(db),
  addBook: addBook(db),
  getBookListings: getBookListings(db),
  getLatestReleases: getLatestReleases(db)
});
