const { buildSchema } = require("graphql"); 
// const schema = buildSchema(` 
// type Query { 
//     users: [User], 
//     userbyname(name: String): User 
// }

// type Mutation { 
//     adduser(name: String, age: Int, email: String): User 
// }
 
// type User { 
//    name: String 
//    age: Int 
//    email: String 
// }

// type Country{
//     code: String
//     name: String
// }
 
// `);

const schema = buildSchema(`
type Query{
    countries: [Country],
    countrybycode(code: String): Country
    countrybyname(name: String): Country
    users: [User], 
    userbyname(name: String): User 
}

type Mutation{
    addcountry(name: String, code: String): Country
    adduser(name: String, age: Int, email: String): User 
}

type Country{
    code: String
    name: String
}
 
type User { 
   name: String 
   age: Int 
   email: String 
}

`)
 
module.exports = { schema };