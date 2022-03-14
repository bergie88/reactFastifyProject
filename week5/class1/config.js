const dotenv = require("dotenv"); 
dotenv.config(); 
module.exports = { 
  atlas: process.env.DBURL, 
  appdb: process.env.DB,
  countriesURL: process.env.ISOCOUNTRIES,
  coll: process.env.COLLECTION,
  port: process.env.PORT 
};