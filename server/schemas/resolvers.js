
const { default: mongoose } = require('mongoose');
const { User, favoriteRecipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { username }) => {
      return User.findOne({ username });
    },
    recipeById: async (_, { idMeal }) => {
      try {
        const objectId = new mongoose.Types.ObjectId(idMeal);

        // Assuming your favoriteRecipe model has a field named 'AddedOn' for sorting
        const recipe = await favoriteRecipe.findOne({ _id: objectId }).sort({ AddedOn: -1 });

        return recipe;
      } catch (error) {
        console.error('Error fetching recipe by ID:', error.message);
        throw new Error('Error fetching recipe by ID');
      }
    },
  },


 Mutation: {
    addUser: async (__, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (__, { email, password }) => {
      try {
        const user = await User.findOne({ email });
    
        if (!user) {
          throw new AuthenticationError('Invalid email or password');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
          throw new AuthenticationError('Invalid email or password');
        }
    
        const token = signToken(user);
    
        return { token, user };
      } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
      }
    },
    
    addRecipe: async (__, { idMeal }, context) => {
      // const newId = "6552a51003c5d2c64a8f7566"
      try {
        console.log('Context:', context);
        console.log('idMeal:', idMeal);
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to add a recipe');
        }
    
        // Check if the recipe already exists
        // const existingRecipe = await favoriteRecipe.findOne({ idMeal });
        // if (existingRecipe) {
        //   throw new Error('Recipe already exists');
        // }
    
        // Create a new recipe and associate it with the user
        // const newRecipe = await favoriteRecipe.create({ _id: idMeal, AddedOn: new Date() });
        await User.findOneAndUpdate(
          // {_id: newId},
          { _id: context.user._id },
          { $addToSet: { favorites: idMeal } },

           {
              new: true,
              runValidators: true,
            }
          
        )
          
        return { idMeal };
       
      } catch (error) {
        console.error('Error in addRecipe resolver:', error);
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
