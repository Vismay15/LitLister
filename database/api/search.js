const findBookWithListing = db => (query, column, page) =>
  db.book.findAndCountAll({
    distinct: true,
    where: {
      [db.Sequelize.Op.or]: query.split(' ').map(str => ({
        [column]: {
          [db.Sequelize.Op.like]: '%' + str + '%'
        }
      }))
    },
    offset: 5 * (page - 1),
    limit: 5,
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

const findBookWithoutListing = db => (query, column, page) =>
  db.book.findAndCountAll({
    where: {
      [db.Sequelize.Op.or]: query.split(' ').map(str => ({
        [column]: {
          [db.Sequelize.Op.like]: '%' + str + '%'
        }
      }))
    },
    offset: 5 * (page - 1),
    limit: 5
  });

const findAllBookWithoutListing = db => (query, column) =>
  db.book.findAll({
    where: {
      [db.Sequelize.Op.or]: query.split(' ').map(str => ({
        [column]: {
          [db.Sequelize.Op.like]: '%' + str + '%'
        }
      }))
    }
  });

module.exports = db => ({
  findBookWithListing: findBookWithListing(db),
  findBookWithoutListing: findBookWithoutListing(db),
  findAllBookWithoutListing: findAllBookWithoutListing(db)
});
