var express = require("express");
var app = express();
var path = require("path");
var admin = require("firebase-admin");
var firebase = require("firebase");

 var config = {
  apiKey: "AIzaSyBrpB0CTavWdcN3NQcR07xM6UKz8WZtqWg",
  authDomain: "quiz-application-199b2.firebaseapp.com",
  databaseURL: "https://quiz-application-199b2.firebaseio.com",
  storageBucket: "quiz-application-199b2.appspot.com",
  messagingSenderId: "550910490749"
};

firebase.initializeApp(config);

var port = 3030;

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index', { title: 'Quiz' });
});

app.get('/generaltech', function(req, res) {
    firebase.database().ref('questions').once('value').then(function(questions){
        res.render('generaltech', { questions: questions.val() });
    });
});

app.get('/leaderboard', function(req, res){
    firebase.database().ref('users').once('value').then(function(users){
        var userObjs = [];
        var _users = users.val();
        for (var x in _users)
        {
            userObjs.push(_users[x]);
        }

        function compare(a,b) {
          if (a.score < b.score)
            return 1;
          if (a.score > b.score)
            return -1;
          return 0;
        }
        res.render('leaderboard', { users: userObjs.sort(compare) });
    });
});

app.get('/add/leaderboard/:username/:score', function(req, res){
    var username = req.params.username;
    var score = req.params.score;
    var users = firebase.database().ref('users');
    users.push({
        'name': username,
        'score': score
    });
    res.redirect('/leaderboard');
});
app.listen(port, function() {
    console.log("Server running on port " + port);
});