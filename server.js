var express = require("express");
var app = express();
var path = require('path');

app.use(express.static('public'))

/* app.get('/', function(req, res){
	res.send('Hello World');

}); */
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(5000, function() {
	console.log("hello World!");
})