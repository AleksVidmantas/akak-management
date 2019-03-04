var express = require('express')
var path = require("path");
var app = express()
var test_router = require('./test_routes.js');

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


app.use('/test', test_router); //test_routes.js handles all of the sub domains here

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})
