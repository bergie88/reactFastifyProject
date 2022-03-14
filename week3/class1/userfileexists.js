const rtns = require("./fileroutines"); 
const userFileExists = async () => { 
  let filename = "./user.json"; 
  try { 
    let fileStats = await rtns.fileStatsFromFSPromise(filename); 
    if (!fileStats) { 
      users = []; 
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
 
      await rtns.writeFileFromFSPromise(filename, JSON.stringify(users)); 
      console.log(`${filename} file written to file system`); 
    } else { 
      console.log(`${filename} already exists`); 
    } 
  } catch (err) { 
    console.log(err); 
    console.log(`${filename} file not written to file system`); 
  } 
}; 
 
userFileExists();