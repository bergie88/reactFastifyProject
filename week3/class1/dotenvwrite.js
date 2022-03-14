const rtns = require("./fileroutines"); 
const { userobjects, rawdata } = require("./config"); 
 
const dotEnvWrite = async () => { 
  try { 
    let fileStats = await rtns.fileStatsFromFSPromise(userobjects); 
    if (!fileStats) { 
      users = []; 
      let rawData = await rtns.readFileFromFSPromise(rawdata); 
 
      rawData 
        .toString() 
        .split("\r\n") 
        .forEach((user) => { 
          if (user.length > 0) { 
            let userJson = { Username: user, Email: user + "@abc.com" }; 
            users.push(userJson); 
          } 
        }); 
 
      await rtns.writeFileFromFSPromise(userobjects, users); 
      console.log(`${userobjects} file written to file system`); 
    } else { 
      console.log(`${userobjects} already exists`); 
    } 
  } catch (err) { 
    console.log(err); 
    console.log(`${userobjects} file not written to file system`); 
  } 
}; 
 
dotEnvWrite();