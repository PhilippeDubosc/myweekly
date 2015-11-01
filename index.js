var express = require('express');
var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var cool = require('cool-ascii-faces');
var app = express();

var mongoUrl = 'mongodb://myweekly:gopotodo@ds049084.mongolab.com:49084/heroku_kl782g06';


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

app.get('/weeklynewspapers', function (request, response) {
    mongoClient.connect(mongoUrl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var findDocuments = function(db/*, callback*/) {
            // Get the documents collection
            var collection = db.collection('weeklynewspaper');
            console.log("find");
            // Find some documents
            collection.find({}).toArray(function(err, docs) {
                console.log("validate");
                assert.equal(err, null);
                assert.equal(1, docs.length);

                console.log("Found the following records");
                console.dir(docs);
                //callback(docs);
            });
        }
        console.log("call");
        findDocuments(db);
        db.close();
    });
    response.send("ok");
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


