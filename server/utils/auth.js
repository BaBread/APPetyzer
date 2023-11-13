const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '24h';

class CustomAuthenticationError extends AuthenticationError {
  constructor(message) {
    super(message);
    this.name = 'CustomAuthenticationError';
  }
}

module.exports = {
  AuthenticationError: CustomAuthenticationError,
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};








// OLD Auth

// const { GraphQLError } = require('graphql');
// const jwt = require('jsonwebtoken');

// const secret = 'mysecretssshhhhhhh';
// const expiration = '2h';

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
