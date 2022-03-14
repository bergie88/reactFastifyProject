const dotenv = require("dotenv"); 
dotenv.config(); 
module.exports = { 
  atlas: process.env.DBURL, 
  appdb: process.env.DB, 
  coll: process.env.COLLECTION, 
  port: process.env.PORT 
};