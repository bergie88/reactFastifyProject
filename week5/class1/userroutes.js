const { coll } = require("./config"); 
const express = require("express"); 
const router = express.Router(); 
const dbRtns = require("./dbroutines"); 
// define a default route to retrieve all users 
 
router.get("/", async (req, res) => { 
   
  try { 
    let db = await dbRtns.getDBInstance(); 
    let users = await dbRtns.findAll(db, coll); 
    res.status(200).send({ users: users }); 
  } catch (err) { 
    console.log(err.stack); 
    res.status(500).send("get all users failed - internal server error"); 
  }  
}); 

router.get("/:name", async (req, res) =>{
    try{
    let db = await dbRtns.getDBInstance();
    let user = await dbRtns.findOne(db, coll, { name: req.params.name })
    
    if(user !== null){
        res.status(200).send({ users: user }); 
    }
    res.status(404).send({ msg: `user not found` });

    }
    catch(err){
        console.log(err.stack); 
        res.status(500).send("get user failed - internal server error");  
    }

});

router.put("/", async (req, res) =>{
    try{
        let user = req.body;
        let db = await dbRtns.getDBInstance();
        let foundUser = await dbRtns.findOne(db, coll, { name: user.name });
        //validate user put
        if("name" in user && "age" in user && "email" in user){
            if(user.name !=="" && user.age > 0 && user.email !== ""){
                if(foundUser === null){
                    res.status(404).send({msg: "no such user to update"});
                }
                let updateResults = await dbRtns.updateOne(db,coll,{ name: user.name }, user);
                let msg;
                updateResults.lastErrorObject.updatedExisting 
                ? (msg = `user ${updateResults.value.name} was updated`) 
                : (msg = `user was not updated`);
                res.status(200).send({msg: msg})
            }
        }
        res.status(405).send({ msg: `server received empty or invalid user data` });
    }
    catch(err){
        console.log(err.stack); 
        res.status(500).send("update user failed - internal server error");  
    }
});

router.post("/", async (req, res) => { 
   
    try { 
      let db = await dbRtns.getDBInstance();
      let user = req.body;

      //basic validation... should use a JSONSchema... but that requires packages etc, and i don't think thats the point here.
      if("name" in user && "age" in user && "email" in user){
          if(user.name !=="" && user.age > 0 && user.email !== "")
          {
            let userToPost = await dbRtns.addOne(db, coll, user); 
            res.status(200).send({msg: "document added to users collection"});
          }
      }
      res.status(405).send({ msg: `server received empty or invalid user data` });
    } catch (err) { 
      console.log(err.stack); 
      res.status(500).send(""); 
    }  
  }); 

  router.delete("/:name", async (req, res) =>{
    try{
        let db = await dbRtns.getDBInstance();
        let user = await dbRtns.findOne(db, coll, { name: req.params.name })
        
        if(user !== null){
            let deletedUserResults = await dbRtns.deleteOne(db, coll, {name: user.name})
            if(deletedUserResults.acknowledged)
            {
                res.status(200).send({ msg: `${deletedUserResults.deletedCount} user was deleted` });
            }
        }
        res.status(404).send({ msg: `no such user to delete` });

    }
    catch(err){
        console.log(err.stack); 
        res.status(500).send("delete user failed - internal server error");  
    }
  })
 
module.exports = router;