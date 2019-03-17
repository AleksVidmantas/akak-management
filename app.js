var mysql = require('mysql')

var pool = mysql.createPool({
  	host: "localhost",
  	port: "3307",
  	user: "root",
  	password: "gaben102",
	database: "akak"
});

pool.getConnection(function(err) {
 	if (err) throw err;
	console.log("Connected!");
	pool.query("SELECT * FROM complaints", function(err, result, fields){
		if (err) throw err;
		console.log(result);
	});
});
console.log("TEst");



