const express_session = require('express-session');
const MysqlSession = require('express-mysql-session')(express_session);

const options = {
  host: 'team44bookproject.cirinnrfd1cl.us-west-2.rds.amazonaws.com',
  port: 3306,
  user: 'Team44Project',
  password: '6NLy9?Qwj75%]5Z9',
  database: 'BookProject',
  expiration: 3600000,
  createDatabaseTable: false,
  schema: {
    tableName: 'session',
    columnNames: {
      session_id: 'sid',
      expires: 'expire',
      data: 'data',
    }
  }
};

const session = express_session({
  store: new MysqlSession(options),
  secret: 'me is a secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
});

module.exports = session;
