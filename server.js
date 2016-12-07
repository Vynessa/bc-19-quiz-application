var express = require("express");
var app = express();
var path = require('path');
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("quiz-application-firebaseKey.json"),
  databaseURL: "https://quiz-application-199b2.firebaseio.com"
});

var appDb = admin.database();

var port = 3030;

app.set('view engine', 'pug');
//app.use(express.static('public'));

//app.set("views", "./views");
//app.set("view engine", "html")

/* app.get('/', function(req, res){
	res.send('Hello World');

}); */

// app.get('/', function(req, res){
// 	res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.get('/', function(req, res){
	res.render('index', { title: 'Index' });
});

app.get('/leaderboard', function(req, res){

	res.render('leaderboard', { title: 'Leaderboard' });
});

app.get('/quiz', function(req, res){
	res.render('quiz', { title: 'Quiz' });
});

app.listen(port, function() {
	console.log("Server running on port " + port);
});