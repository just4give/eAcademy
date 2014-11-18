var express = require('express');
var router = express.Router();
var data = require("../persistence/data");

// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {

		data.getPopularTopics(function (err, results) {
		console.log("Course="+results.upcomings);
        res.render("index", { 
          title: "Academy", 
          error: err, 
          pageData: results
        });
      
    });
   
 });

module.exports = router;
