const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_18" });

const dbConfig = {
  user: 'MYBOARD',
  password: 'myboard0507',
  connectString: 'localhost:1521/XE'
};

module.exports = { oracledb, dbConfig };