(function(data) {

  var database = require("./database");
  var seeddata = require("./seeddata");

  data.getPopularTopics = function (next) {
    var pageData ={};
    console.log("Calling from data.next");
    database.getDb(function (err, db) {
      if (err) {
        next(err, null);
      } else {
        db.topics.find({popular:true},{ title: 1, summary:1,icon:1 }).toArray(function (err, toptopics) {
          if (err) {
            next(err, null);
          } else {
            
            //next(null, results);
            pageData.popular = toptopics;
            
            db.topics.findOne({upcoming:true},{ title: 1, summary:1,icon:1 },function (err, upcoming) {
              if(err){
                next(err, null);
              }else{
                pageData.upcomings = upcoming;
                next(null, pageData);
              }

            }); //ennd of new code
         

          }
        });
      }
    });
  };

data.createTopic = function (topic, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err);
      } else {
    
          
              db.topics.insert(topic, function (err) {
                if (err) {
                  next(err);
                } else {
                  next(null);
                }
              });
             }
    
    });
  };


/*
  data.createNewCategory = function (categoryName, next) {
    database.getDb(function (err, db) {
      if (err) {
        next(err);
      } else {
        db.notes.find({ name: categoryName }).count(function (err, count) {

          if (err) {
            next(err);
          } else {

            if (count != 0) {
              next("Category already exists");
            } else {
              var cat = {
                name: categoryName,
                notes: []
              };
              db.notes.insert(cat, function (err) {
                if (err) {
                  next(err);
                } else {
                  next(null);
                }
              });
            }
          }
        });
      }
    });
  };
*/
  function seedDatabase() {
    database.getDb(function (err, db) {
      if (err) {
        console.log("Failed to seed database: " + err);
      } else {
        // test to see if data exists
        db.topics.count(function (err, count) {
          if (err) {
            console.log("Failed to retrieve database count");
          } else {
            if (count == 0) {
              console.log("Seeding the Database...");
              seeddata.topics.forEach(function (item) {
                db.topics.insert(item, function (err) {
                  if (err) console.log("Failed to insert note into database");
                });
              });
            } else {
              console.log("Database already seeded");
            }
          }
        });
      }
    });
  }

  seedDatabase();

})(module.exports);