const { port } = require("./config"); 
const express = require('express'); 
const app = express();
const myroutes = require('./userroutes'); 


app.use(express.json()); //Used to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// app.use(express.static('public'));

app.use('/api/users', myroutes);


app.use((req, res, next) => { 
    console.log('Time:', new Date() + 3600000 * -5.0); // GMT-->EST 
    next(); 
  });

app.get('/', (req, res) => { 
  res.send('\n\nHello world again!!!!!!!\n\n'); 
}); 

app.listen(port, () => { 
  console.log(`listening on port ${port}`); 
});