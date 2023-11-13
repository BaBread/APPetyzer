const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
    
  }


type Recipe {
  idMeal: ID
}

  type Query {
    users: [User]
    user(username: String!): User
    recipeById(idMeal: ID!): Recipe
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addRecipe(idMeal: ID!): Recipe
    deleteRecipe(idMeal: ID!): Recipe 
  }
`;

module.exports = typeDefs;

