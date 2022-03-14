const { port } = require("./config"); 
// Require the framework and instantiate it 
const fastify = require("fastify")({ logger: true }); 
const routes = require("./fastifyroutes"); 
 
// register the route module 
fastify.register(routes); 
 
// start the fastify server 
fastify.listen(port, (err, address) => { 
  if (err) { 
    fastify.log.error(err); 
    process.exit(1); 
  } 
});