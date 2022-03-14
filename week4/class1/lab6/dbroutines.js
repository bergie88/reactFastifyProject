const got = require("got")
const MongoClient = require("mongodb").MongoClient; 
const { atlas, appdb } = require('./config'); 
let db; 
 
const getJSONFromWWWPromise =  (url) => got(url).json();

const getDBInstance = async () => { 
  if (db) { 
    console.log("using established connection"); 
    return db; 
  } 
 
  try { 
    console.log("establishing new connection to Atlas"); 
    const conn = await MongoClient.connect(atlas, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }); 
    db = conn.db(appdb); 
  } catch (err) { 
    console.log(err); 
  } 
 
  return db; 
}; 

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);
const deleteAll = (db, coll) => db.collection(coll).deleteMany({});
const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);

const findAll = (db, coll, criteria, projection) => 
  db 
    .collection(coll) 
    .find(criteria) 
    .project(projection) 
    .toArray();
 
module.exports = { getDBInstance, addOne, deleteAll, findOne, findAll, getJSONFromWWWPromise };