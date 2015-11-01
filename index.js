var express = require('express');
var mongoClient = require('mongodb').MongoClient
var cool = require('cool-ascii-faces');
var app = express();

var mongoUrl = 'mongodb://myweekly:gopotodo@ds049084.mongolab.com:49084/heroku_kl782g06';
mongoClient.connect(mongoUrl, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db.close();
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});
app.get('/cool', function (request, response) {
    response.send(cool());
});

app.get('/weeklynewspaper', function (request, response) {

    response.send(cool());
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


