const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const SALT_ROUNDS = 10;

// Returns from these functions should be in this format otherwise they may return null
const findUserByEmail = db => email => {
  user = db.user.findOne({ where: { email } });
  return user;
};

const insertUser = db => (
  firstname,
  lastname,
  email,
  hash_me,
  type = 'general'
) =>
  bcrypt.hash(hash_me, SALT_ROUNDS).then(password =>
    db.user.create({
      firstname,
      lastname,
      email,
      password,
      type
    })
  );

// Returns from these functions should be in this format otherwise they may return null
const findUserById = db => uid => {
  user = db.user.findOne({ where: { uid } });
  return user;
};

const findUserProfile = db => uid =>
  db.user.findByPk(uid, {
    include: [
      {
        model: db.listing,
        as: 'Listings',
        include: [
          {
            model: db.book,
            as: 'Book'
          }
        ]
      }
    ],
    attributes: ['firstname', 'lastname', 'email', 'rating']
  });

const updatePassword = db => (email, new_password) =>
  bcrypt
    .hash(new_password, SALT_ROUNDS)
    .then(hash => db.user.update({ password: hash }, { where: { email } }));

const verifyUser = db => email => {
  return db.user.update({ isVerified: 1 }, { where: { email } });
};

const insertSession = db => (sid, data, expire) =>
  db.session.create({
    sid,
    data,
    expire
  });

const deleteSession = db => sid => db.session.destroy({ where: { sid } });

const findSessionBySid = db => sid => db.session.findOne({ where: { sid } });

const insertVerificationToken = db => uid =>
  db.verificationToken.create({ uid: uid, token: cryptoRandomString(16) });

module.exports = db => ({
  insertUser: insertUser(db),
  findUserByEmail: findUserByEmail(db),
  findUserById: findUserById(db),
  findUserProfile: findUserProfile(db),
  updatePassword: updatePassword(db),
  verifyUser: verifyUser(db),
  insertSession: insertSession(db),
  deleteSession: deleteSession(db),
  findSessionById: findSessionBySid(db),
  insertVerificationToken: insertVerificationToken(db)
});
