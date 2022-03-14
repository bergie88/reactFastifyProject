const got = require('got')
const dumpJson = async () => {
 const srcAddr =
 "http://api.open-notify.org/astros.json";
 try {
    const response = await got(srcAddr, { responseType: "json" });
    const CRAFT = "ISS";
    let totalNumPeopleInSpace = response.body.number;
    let people = response.body.people;
    
    let peopleOnCraft = (people, craftName) => {
        let namesOfPeopleOnCraft = [];
        people.forEach(person => {
            if(person.craft === craftName)
                namesOfPeopleOnCraft.push(person.name);
        });
        return namesOfPeopleOnCraft;
    }

    let peopleOnISS = peopleOnCraft(people, CRAFT);

    console.log(`\nThere are currently ${totalNumPeopleInSpace} people in space.\n${peopleOnISS.length} of which are on the International Space Station.\nThey Are:\n`);
    peopleOnISS.forEach(person => {console.log(person)});

 } catch (error) {
    console.log(error);
 }
};
dumpJson();