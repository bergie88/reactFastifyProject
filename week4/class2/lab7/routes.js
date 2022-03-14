const express = require('express'); 
const { loadCountriesCollection, findCountryByCode } = require('./lab7');

const router = express.Router(); 
 
// define a default route 
router.get('/', async (req, res) => { 
  try{
    let status = await loadCountriesCollection();  
    res.status(200).send(status);
  }
  catch(err){
    console.log(err);
  }
}); 
 
// define a get route with a name parameter 
router.get('/:lookup', async (req, res) => { 
  try{
    let name = req.params.lookup;
    let country =  await findCountryByCode(name)
    console.log(country)
    res.status(200).send(country);
  }
  catch(err){
      console.log(err)
  } 
}); 
 
module.exports = router;