const express = require('express'); 
const { loadCountriesCollectionFindByAlpha2 } = require('./lab7/lab7');
const router = express.Router(); 
 
// define a default route 
router.get('/', (req, res) => { 
  res.status(200).send({msg: `this would be a response from the default route`}); 
}); 
 
// define a get route with a name parameter 
router.get('/:lookup', (req, res) => { 
  let name = req.params.lookup;
  let country = await loadCountriesCollectionFindByAlpha2(name)
  console.log(country)
  res.status(200).send(country); 
}); 
 
module.exports = router;