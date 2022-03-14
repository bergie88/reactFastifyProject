const dbRtns = require("./dbroutines"); 
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"}, 
                  {"name":"John Smith", "age":24, "email": "js@abc.com"}, 
                  {"name":"Frazer Bergman", "age":34, "email": "el@abc.com"} ]`; 
 
const addSomeUsers = async () => { 
  let someUsers = JSON.parse(rawJSON); 
 
  try { 
    db = await dbRtns.getDBInstance(); 
    let resultArray = someUsers.map(async (user) => { 
      let result = await dbRtns.addOne(db, "users", user); 
      result.value.acknowledged 
        ? console.log(`added document to users collection`) 
        : console.log(`document not added to users collection`); 
    }); 
    resultArray.forEach((result) => console.log(result)); // don’t use .map here 
  } catch (err) { 
    console.log(err); 
  } finally { 
    process.exit(); 
  } 
}; 
 
addSomeUsers();