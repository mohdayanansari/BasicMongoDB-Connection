const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

//connection url
const url = "mongodb://localhost:27017";

//Database Name
const dbName = "fruitsDB";

//create a new mongoClient
const client = new MongoClient(url);

//Use connect method to connect to the server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Coneected Succesfully to the server");

  const db = client.db(dbName);

  findDocuments(db, function () {
    client.close();
  });
});

const insertDocuments = function (db, callback) {
  //get the documents collection
  const collection = db.collection("fruits");
  //Insert some documents
  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great Fruit",
      },
      {
        name: "Orange",
        score: 10,
        review: "crap",
      },
      {
        name: "Banana",
        score: 8,
        review: "Amazing Fruit",
      },
    ],
    function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.lenght);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

const findDocuments = function (db, callback) {
  //get the documents collection
  const collection = db.collection("fruits");
  //Find some documents
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
