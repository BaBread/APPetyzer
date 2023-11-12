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

  type Query {
    users: [User]
    user(username: String!): User
    recipeById(idMeal: ID!): [favoriteRecipe]
  }

  type favoriteRecipe {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addRecipe(idMeal: ID!): favoriteRecipe
    deleteRecipe(idMeal: ID!): favoriteRecipe  
  }
`;

module.exports = typeDefs;
