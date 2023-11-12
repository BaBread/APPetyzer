const { User, favoriteRecipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (__, { username }) => {
      return User.findOne({ username });
    },
    recipeById: async (__, { idMeal }) => {
      return favoriteRecipe.findOne({ _id: idMeal }).sort({AddedOn: -1});
    },
  },

  favoriteRecipe: {
    addUser: async (__, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (__, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRecipe: async (__, { idMeal }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a recipe');
        }

        // Check if the recipe already exists
        const existingRecipe = await favoriteRecipe.findOne({ _id: idMeal });
        if (existingRecipe) {
          throw new Error('Recipe already exists');
        }

        // Create a new recipe and associate it with the user
        const newRecipe = await favoriteRecipe.create({ _id: idMeal, AddedOn: new Date() });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: newRecipe._id } }
        );

        return newRecipe;
      } catch (error) {
        throw new Error(`Failed to add recipe: ${error.message}`);
      }
    },

    deleteRecipe: async (__, { idMeal }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to delete a recipe');
        }

        // Check if the recipe exists
        const existingRecipe = await favoriteRecipe.findOne({ _id: idMeal });
        if (!existingRecipe) {
          throw new Error('Recipe not found');
        }

        // Check if the user owns the recipe
        if (!context.user.recipes.includes(existingRecipe._id.toString())) {
          throw new AuthenticationError("You don't have permission to delete this recipe");
        }

        // Remove the recipe from the user's recipes
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: existingRecipe._id } }
        );

        // Remove the recipe from the favoriteRecipe collection
        await favoriteRecipe.findOneAndDelete({ _id: idMeal });

        return existingRecipe;
      } catch (error) {
        throw new Error(`Failed to delete recipe: ${error.message}`);
      }
    },
  },
};
module.exports = resolvers;



//Recipe by username 

 // recipe: async (__, { username }) => {
    //   const params = username ? { username } : {};
    //   return favoriteRecipe.find(params).sort({ AddedOn: -1 });
    // },












// const { User, Thought } = require('../models');
// const { signToken, AuthenticationError } = require('../utils/auth');

// const resolvers = {
//   Query: {
//     users: async () => {
//       return User.find().populate('thoughts');
//     },
//     user: async (parent, { username }) => {
//       return User.findOne({ username }).populate('thoughts');
//     },
//     thoughts: async (parent, { username }) => {
//       const params = username ? { username } : {};
//       return Thought.find(params).sort({ createdAt: -1 });
//     },
//     thought: async (parent, { thoughtId }) => {
//       return Thought.findOne({ _id: thoughtId });
//     },
//   },

//   Mutation: {
//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });
//       const token = signToken(user);
//       return { token, user };
//     },
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw AuthenticationError;
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw AuthenticationError;
//       }

//       const token = signToken(user);

//       return { token, user };
//     },
//     addThought: async (parent, { thoughtText, thoughtAuthor }) => {
//       const thought = await Thought.create({ thoughtText, thoughtAuthor });

//       await User.findOneAndUpdate(
//         { username: thoughtAuthor },
//         { $addToSet: { thoughts: thought._id } }
//       );

//       return thought;
//     },
//     addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
//       return Thought.findOneAndUpdate(
//         { _id: thoughtId },
//         {
//           $addToSet: { comments: { commentText, commentAuthor } },
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     },
//     removeThought: async (parent, { thoughtId }) => {
//       return Thought.findOneAndDelete({ _id: thoughtId });
//     },
//     removeComment: async (parent, { thoughtId, commentId }) => {
//       return Thought.findOneAndUpdate(
//         { _id: thoughtId },
//         { $pull: { comments: { _id: commentId } } },
//         { new: true }
//       );
//     },
//   },
// };

// module.exports = resolvers;
