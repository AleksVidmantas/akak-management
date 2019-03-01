var mysql = require('mysql');

var con = mysql.createConnection({
  	host: "localhost",
  	port: "3306",
  	user: "root",
  	password: "gaben101",
	database: "akak"
});

con.connect(function(err) {
 	if (err) throw err;
	console.log("Connected!");
	con.query("SELECT * FROM complaints", function(err, result, fields){
		if (err) throw err;
		console.log(result);
	});
});
console.log("TEst");



