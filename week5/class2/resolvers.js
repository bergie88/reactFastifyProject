const dbRtns = require("./dbroutines"); 
const { coll, users } = require("./config"); 
 
const resolvers = { 
    users: async () => { 
        let db = await dbRtns.getDBInstance(); 
        return await dbRtns.findAll(db, users, {}, {}) 
    },
    userbyname: async args =>{
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, users, {name: args.name})
    },
    adduser: async (args) => { 
        let db = await dbRtns.getDBInstance(); 
        let user = { name: args.name, age: args.age, email: args.email }; 
        let results = await dbRtns.addOne(db, users, user); 
        return results.acknowledged ? user : null; 
    },
    countries: async () => { 
        let db = await dbRtns.getDBInstance(); 
        return await dbRtns.findAll(db, coll, {}, {})
    },
    countrybycode: async args =>{
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, coll, {code: args.code})
    },
    countrybyname: async args =>{
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, coll, {name: args.name})
    },
    addcountry: async (args) => { 
        let db = await dbRtns.getDBInstance(); 
        let country = { name: args.name, code: args.code}; 
        let results = await dbRtns.addOne(db, coll, country); 
        return results.acknowledged ? country : null; 
    } ,
  
  }; 
   
  module.exports = { resolvers };