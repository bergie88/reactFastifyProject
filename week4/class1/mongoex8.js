const dbRtns = require("./dbroutines"); 
 
const rawJSON = `[{"name":"Jane Doe", "age":22, "email": "jd@abc.com"}, 
                  {"name":"John Smith", "age":24, "email": "js@abc.com"}, 
                  {"name":"Frazer Bergman", "age":30, "email": "fb@abc.com"} ]`; 
 
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
    let someUser = await dbRtns.findOne(db, "users", { name: "Frazer Bergman" }); 
    console.log( 
      `User ${someUser.name} was found. This user's email address is ${someUser.email}` 
    ); 
 
    let allJEmails = await dbRtns.findAll( 
      db, 
      "users", 
      { email: /j/ }, // only have addresses contain a j - criteria 
      { email: 1 } // only return the email field - projection 
    ); 
    console.log( 
      `There are ${allJEmails.length} documents in users with a j in the email, they are:` 
    ); 
    allJEmails.forEach((user) => console.log(`\t${user.email}`)); 
  } catch (err) { 
    console.log(err); 
  } finally { 
    process.exit(); 
  } 
}; 
 
reloadUsers();