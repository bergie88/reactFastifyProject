const MongoClient = require("mongodb").MongoClient; 
const { atlas, appdb } = require('./config'); 
let db; 
 
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
 
module.exports = { getDBInstance, addOne, deleteAll, };