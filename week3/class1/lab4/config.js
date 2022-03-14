const dotenv = require("dotenv"); 
dotenv.config(); 
module.exports = { 
  countries: process.env.COUNTRIES, 
  isocountries: process.env.ISOCOUNTRIES, 
};