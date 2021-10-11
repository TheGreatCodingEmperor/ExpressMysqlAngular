module.exports = {
  HOST: "localhost",
  PORT: 3307,
  USER: "root",
  PASSWORD: "70400845",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
