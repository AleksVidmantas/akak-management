var express = require('express')
var path = require("path");
var app = express()
var test_router = require('./test_routes.js');
var mysql = require('mysql')
var myParser = require("body-parser");
app.use(myParser.urlencoded({extended : true}));
var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "gaben101",
    database: "akak"
});

pool.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
    pool.query("SELECT * FROM complaints;", function(err, result, fields){
        if (err) throw err;
        //console.log(result[1].issue);
    }) 
})
console.log("TEst");
exports.poolobj = pool;

app.use(express.static('public'));
app.set('view engine', 'ejs')
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.use('/favicon.ico', express.static('public/favicon.ico'));
app.get('/', function (req, res) {
  res.render('pages/index');
})

app.get('/about', function (req, res) {
	res.render('pages/about');
})
app.get('/location', function (req, res) {
	res.render('pages/location');
})

app.get('/testform', function (req, res) {
	res.render('pages/testform');
})

app.get('/sqltest', function(req, res) {
	res.render('pages/sqltest');
})
// '/sub' is used for getting and receiving sql post data
app.get('/sub', function(req, res) {
	console.log("Req '/sub' GET: " + req.body);
    pool.query("SELECT * FROM complaints;", function(err, result, fields){
		console.log(result);
	    if (err) throw err;
		res.end(JSON.stringify(result));
    	//console.log(result[1].issue);
   		
	 }); 
	
})

app.post('/sub', function(req, res) { //This is responsible for handling SQL
	//res.render('pages/sqltest');
	console.log("post func");	
	console.log(req.body);
	console.log(req.body.role);
	console.log(req.body.issue);
	var sql_data;
	var d = new Date();	
	console.log("INSERT INTO complaints (roll_number, issue, date_filed) VALUES ( " + req.body.role + ", " +"\x22" + req.body.issue + "\x22, \x27" + d.getFullYear()+"-"+pad(d.getMonth(),2)+"-"+pad(d.getDate(),2) + "\x27);");
	pool.query("INSERT INTO complaints (roll_number, issue, date_filed) VALUES (" + req.body.role + ", " +"\x22" + req.body.issue + "\x22, \x27" + d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate() + "\x27);", function(err, result, fields){
        sql_data = result;
		//res.write(result[0].issue);
		res.end();
		if (err) throw err;
		})
        //console.log(result);
		//res.write(result,  function(err) { res.end();});
//http://134.209.10.184/sub    });
	//	res.write(sql_data[0].issue); 
//	res.end();
//	console.log("Test: " + sql_data + " end test.");

	
})
app.use('/test', test_router); //test_routes.js handles all of the sub domains here



app.listen(80, function () {
  console.log('Example app listening on port 80!')
})


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
