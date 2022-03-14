const dotenv = require("dotenv"); 
dotenv.config(); 
module.exports = { 
  atlas: process.env.DBURL, 
  appdb: process.env.DB,
  coll: process.env.COLLECTION,
  users: process.env.USERS,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL
};