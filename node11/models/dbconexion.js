var mysql = require('mysql');
var conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"tiendadwa"
});
conn.connect();
module.exports = conn;
