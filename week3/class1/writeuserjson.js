const rtns = require("./fileroutines"); 
const writeUserJson = async () => { 
  try { 
    users = []; 
    // rawData is returned as a buffer 
    let rawData = await rtns.readFileFromFSPromise("./users"); 
 
    rawData 
      .toString() 
      .split("\r\n") 
      .forEach((user) => { 
        if (user.length > 0) { 
          let userJson = { Username: user, Email: user + "@abc.com" }; 
          users.push(userJson); 
        } 
      }); 
 
    await rtns.writeFileFromFSPromise("./user.json", users); 
    console.log("user json file written to file system"); 
  } catch (err) { 
    console.log(err); 
    console.log("user json file not written to file system"); 
  } 
}; 
 
writeUserJson();