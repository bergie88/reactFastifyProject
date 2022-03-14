const dbRtns = require("./dbroutines"); 
 
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"}, 
                  {"name":"John Smith", "age":24, "email": "js@abc.com"}, 
                  {"name":"Frazer Bergman", "age":34, "email": "fb@abc.com"} ]`; 
 
const reloadUsers = async () => { 
  let someUsers = JSON.parse(rawJSON); 
 
  try { 
    db = await dbRtns.getDBInstance(); 
    let results = await dbRtns.deleteAll(db, "users"); 
    console.log( 
      `deleted ${results.deletedCount} documents from users collection` 
    ); 
    let resultArray = await Promise.allSettled( 
      someUsers.map((user) => { 
        return dbRtns.addOne(db, "users", user); 
      }) 
    ); 
    resultArray.forEach((result) => { 
      result.value.acknowledged 
        ? console.log( 
            `Promise ${result.status} and document added to users collection` 
          ) 
        : console.log( 
            `Promise ${result.status} and document not added to users collection` 
          ); 
    }); 
  } catch (err) { 
    console.log(err); 
  } finally { 
    process.exit(); 
  } 
}; 
 
reloadUsers();