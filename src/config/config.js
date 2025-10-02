const { DB, USER, PASSWORD, HOST, DIALECT } = require('./use_env_variable');

module.exports = {
  development: {
    username: USER || 'postgres',
    password: PASSWORD || null,
    database: DB || 'safetech',
    host: HOST || '127.0.0.1',
    dialect: DIALECT || 'postgres',
  },
  test: {
    username: USER || 'postgres',
    password: PASSWORD || null,
    database: DB || 'safetech',
    host: HOST || '127.0.0.1',
    dialect: DIALECT || 'postgres',
  },
  production: {
    username: USER || 'postgres',
    password: PASSWORD || null,
    database: DB || 'safetech',
    host: HOST,
    dialect: DIALECT || 'postgres',
  },
};