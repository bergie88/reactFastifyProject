const dbRtns = require("./dbroutines"); 
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"}, 
                  {"name":"John Smith", "age":24, "email": "js@abc.com"}, 
                  {"name":"Frazer Bergman", "age":34, "email": "fb@abc.com"} ]`; 
 
addSomeUsers = async () => { 
  let someUsers = JSON.parse(rawJSON); 
 
  try { 
    let statusArray; 
    let db = await dbRtns.getDBInstance(); 
    let resultArray = await Promise.allSettled( 
      // don't await this because we don't need any results immediately and 
      // we use map here because we process the array of promise results not 
      // the original someUsers array 
      someUsers.map((user) => dbRtns.addOne(db, "users", user)) 
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
    process.exit(0); 
  } catch (err) { 
    console.log(err); 
    process.exit(1); 
  } 
}; 
 
addSomeUsers();