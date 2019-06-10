var mysql = require('mysql');

var con = mysql.createConnection({
	  host: "classmysql.engr.oregonstate.edu",
      user: "cs340_maoa",
      password: "1832",
      database: "cs340_maoa"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT Name FROM Customer", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
