const dotenv = require("dotenv"); 
dotenv.config(); 
module.exports = { 
  rawdata: process.env.USERSRAW, 
  userobjects: process.env.USERSJSON, 
};