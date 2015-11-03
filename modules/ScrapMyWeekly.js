/**
 * Created by philippe.dubosc on 03/11/2015.
 */


(function () {
    var MAIN_URL = "http://www.playbac.fr/myweekly/"
    var debug = require('debug')('MyWeekly:ScrapMyWeekly');
    var _ = require('underscore');
    var request = require('request');
    var cheerio = require('cheerio');

    module.exports.listAllNewsPapers = function (callback) {
        console.log("listAllNewsPapers() on " + MAIN_URL);
        var newspapers = [];
        request(MAIN_URL, function (error, response, html) {

            // First we'll check to make sure no errors occurred when making the request

            if (!error) {
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

                var $ = cheerio.load(html);

                var title, release, rating;
                // Finally, we'll define the variables we're going to capture
                $("select[name='date_mw']").children().each(function (i, selectInput) {
                    newspapers.push({'id': $(this).val(), "label": $(this).text()});
                });
                callback(null, newspapers);
                console.log("listAllNewsPapers()/=" + JSON.stringify(newspapers));
            } else {
                callback(error, null);
            }

        })
    }

}());


