var data = require("../persistence/data");



exports.home = function(req, res){
	/*
	res.render('default',{
		title: 'Home',
		category:['Landscape','City Life','Food']
	}); */

	data.getTopics(function (err, results) {
		
        res.render("default", { 
          title: "Training", 
          error: err, 
          category: results
        });
      
    });
};

exports.getCreatTopic = function (req, res) {
      res.render("addtopics", { 
          title: "Training"
          
        });
  };

exports.postCreatTopic = function (req, res) {
      console.log("Title = "+req.body.title);
var newTopic = {
                title: req.body.title,
                author: req.body.author,
                type: req.body.type
              };
    res.redirect("/");
      // data.createTopic(newTopic, function (err) {
      //   if (err) {
      //     // Handle Error
      //     console.log("Error in topic creation "+err);
          
      //   } else {
      //     res.redirect("/");
      //   }
      // });
  };


exports.about = function(req, res){

	res.render('default',{
		title: 'About Us'
	});
};


/*
    app.post("/newCategory", function (req, res) {
      var categoryName = req.body.categoryName;
      data.createNewCategory(categoryName, function (err) {
        if (err) {
          // Handle Error
          console.log(err);
          req.flash("newCatName", err);
          res.redirect("/");
        } else {
          res.redirect("/notes/" + categoryName);
        }
      });
    });
*/