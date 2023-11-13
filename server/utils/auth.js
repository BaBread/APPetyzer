const { AuthenticationError: ApolloAuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');  // Import GraphQLError

const jwt = require('jsonwebtoken');

class AuthenticationError extends GraphQLError {
  constructor() {
    super('Could not authenticate user.', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}

const secret = process.env.JWT_SECRET;
const expiration = '72h';

module.exports = {
  AuthenticationError,
  ApolloAuthenticationError,
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// OLD Auth

// const { GraphQLError } = require('graphql');
// const jwt = require('jsonwebtoken');

// const secret = 'mysecretssshhhhhhh';
// const expiration = '36h';

// module.exports = {
//   AuthenticationError: new GraphQLError('Could not authenticate user.', {
//     extensions: {
//       code: 'UNAUTHENTICATED',
//     },
//   }),
//   signToken: function ({ email, username, _id }) {
//     const payload = { email, username, _id };
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
