// database.js
(function (database) {

  var mongodb = require("mongodb");
  //var mongoUrl =  "mongodb://admin:admin@linus.mongohq.com:10091/app30980172" 
  var mongoUrl = "mongodb://localhost:27017/academy";
  var theDb = null;

  database.getDb = function (next) {
     console.log("Calling from database.next");
    if (!theDb) {
      // connect to the database
      mongodb.MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
          next(err, null);
        } else {
          theDb = {
            db: db,
            topics: db.collection("topics")
          };
          next(null, theDb);
        }
      });
    } else {
      next(null, theDb);
    }
  }

})(module.exports);