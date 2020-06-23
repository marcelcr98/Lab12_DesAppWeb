var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  port:3306,
  user: 'bda87bde2321a4',
  password: '51ad6e9a',
  database: 'heroku_df2f4a10ff3ea9d'
});
conn.connect();
module.exports = conn;
